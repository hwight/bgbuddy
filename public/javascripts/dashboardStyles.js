
/* Globals  */
var verticalOffsetLog;
var navBarHeight;
var activeSectionIndex = 0;
var sectionLocations = 
[
    ["Home", 0],
    ["ExerciseLog", 0],
    ["FoodLog", 0],
    ["BGLog", 0],
    ["PetStore", 0],
    ["About", 0]
];


/* 
    Document Set up once the page is loaded
*/

$(document).ready(function()
{
    // Find the height of the navbar
    navBarHeight = $(".navBar").height();

    // Find the initial vertical offset of the window
    verticalOffsetLog = $(".navBar").offset().top;

    // Fit the sections to the initial screen size
    fitSectionsToScreen();

    // Find coordinates of sections
    evaluateSectionLocations();

    // Set the currently active section
    computeActiveSectionIndex();

    // Smooth scrolling with navbar
    $('li > a').click(function()
    {
        $('html, body').animate({ scrollTop: $( $.attr(this, 'href') ).offset().top }, 500);

        return false;
    });


    // Set handler for scrolling
    $(window).scroll(scrollHandler);

    // Set handler for resizing
    window.addEventListener('resize', handleResizing);


});



/* 
    Handles the user resizing the window
*/

function handleResizing()
{
    fitSectionsToScreen();
    evaluateSectionLocations();
}


/* 
    Fit the various sections to the screen size
    ******* REMEMBER TO ACCOMODATE FOR SMALL SCREENS******
*/

function fitSectionsToScreen()
{
    var screenHeight = $(window).height();
    var navBarHeight = $(".navBar").height();
    $("section").css("height", "" + screenHeight-navBarHeight + "px");

}


/* 
    Finds and stores the coordinates of each section
        in the sectionLocations dictionary
*/

function evaluateSectionLocations()
{
    sectionLocations[0][1] = $("#" + sectionLocations[0][0]).offset().top;
    sectionLocations[1][1] = $("#" + sectionLocations[1][0]).offset().top;
    sectionLocations[2][1] = $("#" + sectionLocations[2][0]).offset().top;
    sectionLocations[3][1] = $("#" + sectionLocations[3][0]).offset().top;
    sectionLocations[4][1] = $("#" + sectionLocations[4][0]).offset().top;
    sectionLocations[5][1] = $("#" + sectionLocations[5][0]).offset().top;
}



/* 
    Handles the user scrolling.
*/

function scrollHandler()
{

    // Evaluate the new offset 
    var newOffset = $(".navBar").offset();

    // Print offset to h1 elements
    $("h1").html(verticalOffsetLog.toString() + " " + ($(window).height()).toString());

    for(var i = 0; i < 6; i++)
    {
        $("#" + sectionLocations[i][0] + " > h2").html(sectionLocations[i][1].toString() + "  " + activeSectionIndex.toString());
    }


    // Refresh active section index
    computeActiveSectionIndex();

    // Log the new offset
    verticalOffsetLog = newOffset.top;
}


/* 
    Computes the index of the active section
*/

function computeActiveSectionIndex()
{

    // Compensate ranges
    // aka if the user is scrolled past the last quarter of a section
    // they are essentially in the next section
    var focusComensation = parseInt(sectionLocations[1][1]/4);

    // Evalution which section the current offset log evaluates to
    // set the active section index accordingly

    if(verticalOffsetLog >= sectionLocations[0][1] && verticalOffsetLog < sectionLocations[1][1]-focusComensation)
    {
        if(activeSectionIndex !== 0)
        {
            activeSectionIndex = 0;
            updateNavbar("#Home");
        }
    }
    else if(verticalOffsetLog >= sectionLocations[1][1]-focusComensation && verticalOffsetLog < sectionLocations[2][1]-focusComensation)
    {        
        if(activeSectionIndex !== 1)
        {
            activeSectionIndex = 1;
            updateNavbar("#ExerciseLog");           
        }
    }
    else if(verticalOffsetLog >= sectionLocations[2][1]-focusComensation && verticalOffsetLog < sectionLocations[3][1]-focusComensation)
    {
        if(activeSectionIndex !== 2)
        {
            activeSectionIndex = 2;
            updateNavbar("#FoodLog");           
        }
    }
    else if(verticalOffsetLog >= sectionLocations[3][1]-focusComensation && verticalOffsetLog < sectionLocations[4][1]-focusComensation)
    {
        if(activeSectionIndex !== 3)
        {
            activeSectionIndex = 3;
            updateNavbar("#BGLog");           
        }
    }
    else if(verticalOffsetLog >= sectionLocations[4][1]-focusComensation && verticalOffsetLog < sectionLocations[5][1]-focusComensation)
    {
        if(activeSectionIndex !== 4)
        {
            activeSectionIndex = 4;
            updateNavbar("#PetStore");           
        }
    }
    else
    {
        if(activeSectionIndex !== 5)
        {
            activeSectionIndex = 5;
            updateNavbar("#About");           
        }
    }

}


/* 
    Manages navbar interactions
*/

function manageNavbar(url)
{
    // Cast the url to a string for operations
    var urlString = url.toString();

    // Determine which section was activated
    if(urlString.indexOf("#Home") > -1)
    {
        activeSectionIndex = 0;
        verticalOffsetLog = sectionLocations[activeSectionIndex][1];
        updateNavbar("#Home");
    }
    else if(urlString.indexOf("#ExerciseLog") > -1)
    {
        activeSectionIndex = 1;
        verticalOffsetLog = sectionLocations[activeSectionIndex][1];
        updateNavbar("#ExerciseLog");
    }
    else if(urlString.indexOf("#FoodLog") > -1)
    {
        activeSectionIndex = 2;
        verticalOffsetLog = sectionLocations[activeSectionIndex][1];
        updateNavbar("#FoodLog");
    }
    else if(urlString.indexOf("#BGLog") > -1)
    {
        activeSectionIndex = 3;
        verticalOffsetLog = sectionLocations[activeSectionIndex][1];
         updateNavbar("#BGLog");
    }
    else if(urlString.indexOf("#PetStore") > -1)
    {
        activeSectionIndex = 4;
        verticalOffsetLog = sectionLocations[activeSectionIndex][1];
        updateNavbar("#PetStore");
    }
    else if(urlString.indexOf("#About") > -1)
    {
        activeSectionIndex = 5;
        verticalOffsetLog = sectionLocations[activeSectionIndex][1];
        updateNavbar("#About");
    }
    else /* Default to home */
    {
        activeSectionIndex = 0;
        verticalOffsetLog = sectionLocations[activeSectionIndex][1];
        updateNavbar("#Home");
    }

}


/* 
    Performs updates within the navbar
*/

function updateNavbar(sectionID)
{
    var navbarElements = $("#navBar").find("li");
    var activeSection = sectionLocations[activeSectionIndex][0];

    navbarElements.each(function(index)
    {
        var anchor = $(this).children("a");
        if($(this).hasClass("active"))
        {
            $(this).removeClass("active");
        }

        if(anchor.attr("href") == "#"+activeSection)
        {
            $(this).addClass("active");
        }


    });

}




