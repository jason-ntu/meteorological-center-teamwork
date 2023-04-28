var percent = 0

function deleteLoadingPage() {
    var selectedClass = document.querySelector(".pageLoading");
    selectedClass.parentNode.removeChild(selectedClass);
}

var timer = setInterval(function () {
    $(".bar").css("width", percent + "%");
    percent += 1;
    if (percent > 100) {
        $(".pageLoading").addClass("complete");
        setTimeout(deleteLoadingPage, 800);
        clearInterval(timer);
    }
}, 30)

