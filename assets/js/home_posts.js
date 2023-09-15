{
  //method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
			let newPost = newPostDom(data.data.post);
			$('#posts-list-container>ul').prepend(newPost);
			deletePost($('.delete-post-button', newPost));
 			
			
			// call the create comment class
			new PostComments(data.data.post._id);
                    
			new ToggleLike($(' .toggle-like-button', newPost));

			new Noty({
				theme: 'relax',
				text: "Post published !!!",
				type: 'success',
				layout: 'topRight',
				timeout: 1500
				
			}).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create a post in DOM

  let newPostDom = function (post) {
    return $(`
		<li id="post-${post._id}">
	<p>
		<small>
			<a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
		</small>
		${post.content}
		<br>
		<small>
                            
		<a class="toggle-like-button" data-likes="${ post.likes.length }" href="/likes/toggle/?id=${post._id}&type=Post">
			<i class="fa-regular fa-heart"></i> ${ post.likes.length } likes
		</a>

		</small>
	</p>
	<div class="post-comments">
			<form action="/comments/create" method="POST">
				<input type="text" name="content" placeholder=" Add Comment" required>
				<input type="hidden" name="post" value="${post._id}">
				<input type="submit" value="Add comment">
			</form>
		<div class="post-comment-list">
			<ul id="post-comments-${post._id}"> 
				
			</ul>
		</div>
	</div>
</li>
	`);
  };

  //method to delete a post from DOM
  let deletePost = function(deleteLink){
	${delteLink}.click(function(e){
		e.preventDefault();

		$.ajax({
			type:'get',
			url:${deleteLink}.prop('href'),
			success: function(data){
				$(`#post-${data.data.post_id}`).remove();

				new Noty({
					theme: 'relax',
					text: "Post Deleted !!!",
					type: 'success',
					layout: 'topRight',
					timeout: 1500
					
				}).show();
			}, error: function(error){
				console.log(error.responseText)
			}
		})
	})
  }


  createPost();
}
