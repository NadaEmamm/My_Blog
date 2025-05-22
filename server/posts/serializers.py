from .models import Post, Comment
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at',  'post', 'user']
        read_only_fields = ['id', 'created_at', 'post', 'user']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'content', 'image', 'created_at', 'comments', 'user']
        read_only_fields = ['id', 'created_at', 'user']

