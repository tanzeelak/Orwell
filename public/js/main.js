document.addEventListener("DOMContentLoaded", function(event) {
    console.log("hello");
});

function reformatToPs(i, item){
    var list = item.description.split('*');
    var html = '';
     for(var i=0; i<list.length; i++) {
        html += '<p>' + list[i] + '</p>';
      }
    // html += '</ul>';
    item.description = html;
}
