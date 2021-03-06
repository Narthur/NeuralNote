/**
 * Created by nathan on 5/10/15.
 */

var App = Class.create();
App.prototype = {
    initialize: function(db,view) {
        this.db = db;
        this.view = view;
    },
    note: function (item) {
        return '<li class="note" id="' + item['noteId'] + '">' + item['content'] + '</li>';
    },
    notes: function (notes) {
        var noteHtml = '';
        var that = this;
        $.each(notes, function (i, item) {
            noteHtml += that.note(item);
        });
        return '<ul class="getNotes">' + noteHtml + '</ul>';
    },
    pane: function(notes) {
        var ul = this.notes(notes);
        return '<div class="pane">' + ul + '</div>';
    },
    frame: function(notes) {
        var pane = this.pane(notes);
        return '<div class="frame">' + pane + '</div>';
    },
    loadFrame: function(notes) {
        var frame = this.frame(notes);
        this.view.append(frame,'body');
    },
    loadApp: function() {
        var that = this;
        this.db.getNotes(function(notes) {
            that.loadFrame(notes)
        });
    },
    addPane: function(linkedTo) {
        var that = this;
        this.db.getNotes(function(notes) {
            that.loadPane(notes);
        }, linkedTo);
    },
    loadPane: function(notes) {
        var that = this;
        this.view.each('.pane',function(pane) {
            that.shiftPane(pane);
        });
        var pane = this.pane(notes);
        this.view.append(pane,'.frame');
    },
    processNoteClick: function(noteId) {
        this.addPane(noteId);
    },
    shiftPane: function(pane) {
        var right = this.view.getCss('right',pane);
        right = parseInt(right,10);
        right += 300;
        right += 'px';
        this.view.setCss('right',right,pane);
    }
};

var View = Class.create();
View.prototype = {
    initialize: function() {},
    append: function(html, target) {
        $(target).append(html);
    },
    setCss: function(property,value,target) {
        $(target).css(property,value);
    },
    getCss: function(property, target) {
        return $(target).css(property);
    },
    each: function(target, action) {
        $(target).each(function() {
           action(this);
        });
    }
};

var Db = Class.create();
Db.prototype = {
    initialize: function() {},
    getNotes: function(callback, linkedTo) {
        if (linkedTo === null) {
            var data = {'action': 'load'};
        } else {
            var data = {'action': 'load', 'linkedTo': linkedTo};
        }

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

$(document).ready(function() {
    var db = new Db();
    var view = new View();
    var app = new App(db,view);
    app.loadApp();

    $(document.body).on('click', '.note', function () {
        var noteId = $(this).attr('id');
       app.processNoteClick(noteId);
    });
});


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
    box.setCss('height',(oldHeight+txtHeight)+'px');

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