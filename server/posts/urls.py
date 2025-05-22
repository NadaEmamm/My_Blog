from django.urls import path
from .views import PostList,PostDetail,CommentListCreateView, CommentDetailView 

urlpatterns = [
    path('', PostList.as_view(), name='post_list'),
    path('<int:post_id>/comments/', CommentListCreateView.as_view(), name='comment_list_create'),
    path('<int:post_id>/comments/<int:pk>/', CommentDetailView.as_view(), name='comment_detail'),
    path('<int:pk>/', PostDetail.as_view(), name='post_detail'),

]