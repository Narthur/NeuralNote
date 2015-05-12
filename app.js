/**
 * Created by nathan on 5/10/15.
 */

var App = Class.create();
App.prototype = {
    initialize: function(db,view) {
        this.db = db;
        this.view = view;
    },
    loadFrame: function(notes) {
        var noteHtml = '';
        $.each(notes, function(i, item) {
            noteHtml += '<li class="note" id="'+item['noteId']+'">'+item['content']+'</li>';
        });
        var ul = '<ul class="getNotes">'+noteHtml+'</ul>';
        var pane = '<div class="pane">'+ul+'</div>';
        var frame = '<div class="frame">'+pane+'</div>';
        this.view.append(frame,'body');
    },
    loadApp: function() {
        this.db.getNotes(this.loadFrame);
    }
};

var View = Class.create();
View.prototype = {
    initialize: function() {},
    append: function(html, target) {
        $(target).append(html);
    }
};

var Db = Class.create();
Db.prototype = {
    initialize: function() {},
    getNotes: function(callback) {
        var data = {'action': 'load'};
        $.ajax({
            url: 'backend.php',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function (json) {
                console.log(json);
                callback(json);
            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError: " + err);
            }
        });
    }
};

var db = new Db();
var view = new View();
var app = new App(db,view);
app.loadApp();

/*
function sendDataToBackend(data) {
    $.ajax({
        url: 'backend.php',
        type: 'post',
        data: data,
        success: function (data, status) {
            console.log(data);
        },
        error: function (xhr, desc, err) {
            console.log(xhr);
            console.log("Details: " + desc + "\nError: " + err);
        }
    })
}

function loadNote(item, target) {
    console.log(item);

    var note = '<li class="note" id="' + item.noteId + '">' + item.content + '</li>';
    $(target).append(note);
}

function requestJson(data, callback) {
    $.ajax({
        url: 'backend.php',
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (json) {
            console.log(json);
            callback(json);
        },
        error: function (xhr, desc, err) {
            console.log(xhr);
            console.log("Details: " + desc + "\nError: " + err);
        }
    });
}
function loadNotes(getNotes, target) {
    $.each(getNotes, function(i, item) {
        loadNote(item, target);
    });
}

function getNotes(linkedTo) {
    if (linkedTo == null) {
        var data = {'action': 'load'};
    } else {
        var data = {'action': 'load','linkedTo': linkedTo};
    }
    var target = '#main .getNotes';
    $(target).empty();
    requestJson(data, loadNotes);
}

$(document).ready(function() {

    function registerNoteClickHandler() {
        $(document.body).on('click', '.note', function () {
            $('.note').removeClass('active');
            $(this).addClass('active');
        });
    }

    function checkConnection() {
        var data = {'action': 'hello'};
        sendDataToBackend(data);
    }

    checkConnection();
    loadNotes(null);
    registerNoteClickHandler();
    $('#search').val('');
});

$(document).keydown(function(e) {

    //console.log(e.which);
    var current = $('.active');
    if (e.which == 38) { //up
        current.prev().addClass('active');
        current.removeClass('active');
    } else if (e.which == 40) { //down
        current.next().addClass('active');
        current.removeClass('active');
    } else if (e.which == 13) { //enter
        e.preventDefault();
        var search = $('#search');
        if (search.is(':focus')) {
            if (search.not(':empty')) {
                if ($('#main .getNotes').children(':visible').length == 0) {
                    console.log('do it');
                    var note = search.val();
                    var data = {'action': 'new', 'content': note};
                    sendDataToBackend(data);
                    loadNotes(null);
                    search.val('');
                    filter(search);
                }
            }
        }
    }

});

function filter(element) {
    var box = $(element);
    var oldHeight = box.height();
    var txtHeight = box.scrollTop();
    box.css('height',(oldHeight+txtHeight)+'px');

    var value = box.val();
    box.parents('.pane').find(".note").each(function() {
        if ($(this).text().toLowerCase().search(value.toLocaleLowerCase()) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}
*/