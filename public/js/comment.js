console.log(id)
$(document).ready(function() {
    $.getJSON("/post/api/comments")
    .then((function(com) {
        console.log(com)
    }))

    $("#commentInput").keypress(function(event){
        if(event.which === 13){
            createComment()
        }
    });

    $("#commentInput").on('click', function() {
        createComment()
    })

    // $('.list').on('click','span', function(e) {
    //     e.stopPropagation()
    //     removeTodo($(this).parent())
    // })

    // $('.list').on('click', 'li', function() {
    //     updateTodo($(this))
    // })
});

function addComments(komentar) {
    komentar.forEach(comment => {
        addComment(comment)
    });
};

function addComment(comment) {
    var newComment = $('<li>'+ comment.comment + '</li>');
    newComment.data('id', comment.id)
    newComment.data('post_id', comment.post_id)
    newComment.data('user_id', comment.user_id)
    $('.list').append(newComment)
};

function createComment() {
    var usrInput = $('#commentInput').val();
    $.post('/post/'+post.id+'/api/comments', {post_id: req.params.id, user_id: currentUser,comment: usrInput})
    .then(function(newComment) {
        $('#commentInput').val('')
        addComment(newComment)
    })
    .catch(function(err) {
        console.log(err)
    })
}