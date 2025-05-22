# from django.db import models

# Create your models here.

# class Comment(models.Model):
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     is_deleted = models.BooleanField(default=False)
#     post_id = models.ForeignKey('posts.Post', on_delete=models.CASCADE)
#     user_id = models.ForeignKey('auth.User', on_delete=models.CASCADE)