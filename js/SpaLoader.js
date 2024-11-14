function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('content').innerHTML = error;
        });
}
document.addEventListener('DOMContentLoaded', function() {
    loadContent('indexContent.html');
});