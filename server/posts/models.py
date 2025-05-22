from django.db import models

# Create your models here.

class Post(models.Model):
    content = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE   , related_name='posts')


class Comment(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    post = models.ForeignKey('posts.Post', on_delete=models.CASCADE , related_name='comments')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE   , related_name='comments')

    def __str__(self):
          return f'Comment by {self.user.username} on {self.post.content}'