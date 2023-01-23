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

$(document).on("click", ".likeButton", ()=> {
    alert("likeButton");
})
$(document).on("click", ".retweetButton", ()=> {
    alert("retweetButton");
})
$(document).on("click", ".commentButton", ()=> {
    alert("commentButton");
})
function createPostHtml(postData) {

    var postedBy = postData.postedBy;
    var displayName = postedBy.firstName + " " + postedBy.lastName;
    var timestamp = timeDifference(new Date(), new Date(postData.createdAt));
    // var timestamp = postData.createdAt;

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
                            <div class="postButtonContainer">
                                <button class="commentButton">
                                    <i class="far fa-comment"></i>
                                </button>
                            </div>
                            <div class="postButtonContainer">
                                <button class="retweetButton">
                                    <i class="fas fa-retweet"></i>
                                </button>
                            </div>
                            <div class="postButtonContainer">
                                <button class="likeButton">
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}


function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000 < 30) return "Just Now";
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}