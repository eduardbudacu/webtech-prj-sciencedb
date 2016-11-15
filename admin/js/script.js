// READ records
function readRecords() {
    $.get("/articles/", {}, function (data, status) {
        $('.count').html(data.length);
        data.forEach(function(value) {
            var row = '<tr>'
            			+	'<td>'+value.id+'</td>'
            			+	'<td>'+value.title+'</td>'
            			+	'<td>'+value.abstract.substring(0,255)+' <a href="#"> ...</a></td>'
            			+	'<td>'+value.authors+'</td>'
            			+	'<td align="center">'
            			+		'<button data-id="'+value.id+'" class="btn btn-warning">Update</button>'
            			+	'</td>'
            			+	'<td align="center">'
            			+		'<button data-id="'+value.id+'" class="btn btn-danger">Exclude</button>'
            			+	'</td>'
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

$(document).ready(function () {
    // READ recods on page load
    readRecords(); // calling function
});