/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/terms/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#terms').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td>'+value.id+'</td>'
            + '<td class="term">'+value.term+'</a></td>'
			+ '<td class="term_ro">'+ value.term_ro+ '</td>'
			+ '<td class="description">'+ value.description +'</td>'
			+ '<td class="description_ro">'+ value.description_ro +'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Exclude</button>'
			+ '</td>';
}

function addRecord() {
    $('#id').val('');
    $('#term').val('');
    $('#term_ro').val('');
    $('#description').val('');
    $('#description_ro').val('');
    
    $('#myModalLabel').html('Add New Article');
    $('#add_new_record_modal').modal('show');
}

function viewRecord(id) {
    var url = "/terms/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#term').val(data.term);
        $('#term_ro').val(data.term_ro);
        $('#description').val(data.description);
        $('#description_ro').val(data.description_ro);
        
        $('#id').val(id);
        $('#myModalLabel').html('Edit Term');
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    var formData = $('#record_form').serializeObject();
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/terms/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#terms').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/terms/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.term').html(formData.term);
            $('#row_id_'+formData.id+'>td.term_ro').html(formData.term_ro);
            $('#row_id_'+formData.id+'>td.description').html(formData.description);
            $('#row_id_'+formData.id+'>td.description_ro').html(formData.description_ro);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/terms/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}


//extending jQuery with a serializeObject method so that form values can be retrieved as JSON objects
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};