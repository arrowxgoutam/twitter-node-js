$("#postTextarea").keyup(event => {
    var textbox = $(event.target);
    var value = textbox.val().trim();
    
    var submitBUtton = $("#submitPostButton");
    if(submitBUtton.length == 0) return alert("No submit button found");
    if(value == ""){
        submitBUtton.prop("disabled", true);
        return;
    } 
    submitBUtton.prop("disabled", false);
    
})

$("#submitPostButton").click((event) => {
    var button = $(event.target);
    var textbox = $("#postTextarea");

    var data = {
        content: textbox.val()
    }

    $.post("/api/posts", data, postData => {
        var html = createPostHtml(postData);
        $(".postContainer").prepend(html);
        textbox.val("");
        button.prop("disabled", true);
    })
})

function createPostHtml(postData) {

    var postedBy = postData.postedBy;
    var displayName = postedBy.firstName + " " + postedBy.lastName;
    var timestamp = postData.createdAt;

    return `<div class="post">
                <div class="mainContentContainer">
                    <div class="userInageContainer">
                        <img src="${postedBy.profilePic}">
                    </div>
                    <div class="postContentContainer">
                        <div class="postHeader">
                            <a href="/profile/${postedBy.username}" >${displayName}</a>
                            <span class="username">@${postedBy.username}</span>
                            <span class="date">${timestamp}</span>
                        </div>
                        <div class="postBody">
                            <span>${postData.content}</span>
                        </div>
                        <div class="postFooter">
                        </div>
                    </div>
                </div>
            </div>`;
}