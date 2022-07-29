// ==UserScript==
// @name         Display Name Removal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Cyanism
// @match        https://www.roblox.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=roblox.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("load", function(){

    let currentURL = window.location.href

        if (currentURL.includes("www.roblox.com/users") && currentURL.includes("/profile"))
        {
            profileURL()
        }
        else if (currentURL.includes("www.roblox.com/home"))
        {
            homeURL()
        }
        else if (currentURL.includes("www.roblox.com/catalog/"))
        {
            catalogURL()
        }
        else if (currentURL.includes("www.roblox.com/users/friends"))
        {
            friendsURL(currentURL)
        }
        else if (currentURL.includes("www.roblox.com/groups"))
        {
            groupURL()
        }
        else if (currentURL.includes("www.roblox.com/games"))
        {
            gameURL()
        }

    },false)
})();

function profileURL()
{
    var displayName = document.getElementsByClassName("profile-name text-overflow")[0]
    var userName = document.getElementsByClassName("profile-display-name font-caption-body text text-overflow")[0]
    var friendsDisplayNames = document.getElementsByClassName("text-overflow friend-name font-caption-header ng-binding")
    var friendsProfileURL = document.getElementsByClassName("text-link friend-link ng-isolate-scope")
    let profileApiURL

    var shortName = userName.innerText
    // console.log(shortName + " is the user name")
    displayName.innerHTML = shortName.substring(1, shortName.length)
    userName.innerHTML = "Display Name: " + document.getElementsByClassName("profile-name text-overflow font-header-1")[0].innerHTML


    for (let i = 0; i < friendsDisplayNames.length; i++)
    {
        profileApiURL = "https://api.roblox.com/users/" + friendsProfileURL[i].href.substring(29, friendsProfileURL[i].href.lastIndexOf('/'))
        $.getJSON(profileApiURL, function(data){

            friendsDisplayNames[i].innerHTML = data.Username
            friendsDisplayNames[i].title = data.Username
        })

    }
}

function homeURL()
{
    var friendsProfileURL = document.getElementsByClassName("text-link friend-link ng-isolate-scope")
    var friendsDisplayNames = document.getElementsByClassName("text-overflow friend-name font-caption-header ng-binding")
    let profileApiURL

    for (let i = 0; i < friendsDisplayNames.length; i++)
    {
        
        profileApiURL = "https://api.roblox.com/users/" + friendsProfileURL[i].href.substring(29, friendsProfileURL[i].href.lastIndexOf('/'))
        $.getJSON(profileApiURL, function(data){

            friendsDisplayNames[i].innerHTML = data.Username
            friendsDisplayNames[i].title = data.Username
        })

    }
}

function friendsURL(currentURL)
{
    var friendsDisplayNames = document.getElementsByClassName("text-overflow avatar-name")
    var friendUsernames = document.getElementsByClassName("avatar-card-label")
    var tempName
    var leftButton = document.getElementsByClassName("btn-generic-left-sm")[0]
    var rightButton = document.getElementsByClassName("btn-generic-right-sm")[0]

    if(currentURL.includes("/friend-requests"))
    {
        for (let i = 0; i < friendsDisplayNames.length; i++)
    {
        tempName = friendsDisplayNames[i].innerHTML
        friendsDisplayNames[i].innerHTML = friendUsernames[i].innerHTML.substring(1, friendUsernames[i].innerHTML.length)
        friendUsernames[i].innerHTML = "Display Name: " + tempName
    }
    }
    else
    {
        for (let i = 0; i < friendsDisplayNames.length; i++)
    {
        tempName = friendsDisplayNames[i].innerHTML
        friendsDisplayNames[i].innerHTML = friendUsernames[i*2].innerHTML.substring(1, friendUsernames[i*2].innerHTML.length)
        friendUsernames[i*2].innerHTML = "Display Name: " + tempName
    }
    } 
    leftButton.onclick = function(){
        wait(2000) 
        friendsURL()}
    rightButton.onclick = function(){
        wait(2000)
        friendsURL()}

}

function catalogURL()
{
    var friendsDisplayNames = document.getElementsByClassName("text-name")
    let profileApiURL
    var loadMore = document.getElementsByClassName("btn-control-sm rbx-comments-see-more")[0]

    for (let i = 0; i < friendsDisplayNames.length; i++)
    {
        if (!(friendsDisplayNames[i].href == null))
        {
        profileApiURL = "https://api.roblox.com/users/" + friendsDisplayNames[i].href.substring(29, friendsDisplayNames[i].href.lastIndexOf('/'))
        $.getJSON(profileApiURL, function(data){

            friendsDisplayNames[i].innerHTML = data.Username
            friendsDisplayNames[i].title = data.Username
        })
        }
        else
        {

        }

    }
    loadMore.onclick = function(){catalogURL()}
}

function groupURL()
{
    var groupDisplayNames = document.getElementsByClassName("text-overflow font-caption-header member-name ng-binding ng-scope")
    var groupProfileURL = document.getElementsByClassName("list-item member ng-scope")
    var commentProfile = document.getElementsByClassName("text-name ng-binding ng-scope")
    var leftButton = document.getElementsByClassName("btn-generic-left-sm")[0]
    var rightButton = document.getElementsByClassName("btn-generic-right-sm")[0]
    var rankButton = document.getElementsByClassName("ng-scope")
    let profileApiURL

    for (let i = 0; i < groupDisplayNames.length; i++)
    {
        
        profileApiURL = "https://api.roblox.com/users/" + groupProfileURL[i].id.substring(7, groupProfileURL[i].id.length)
        $.getJSON(profileApiURL, function(data){

            groupDisplayNames[i].innerHTML = data.Username
            groupDisplayNames[i].title = data.Username
        })

    }

    for (let i = 0; i < commentProfile.length; i++)
    {
        
        profileApiURL = "https://api.roblox.com/users/" + commentProfile[i].href.substring(29, commentProfile[i].href.lastIndexOf('/'))
        $.getJSON(profileApiURL, function(data){

            commentProfile[i].innerHTML = data.Username
            commentProfile[i].title = data.Username
        })

    }
    leftButton.onclick = function(){groupURL()}
    rightButton.onclick = function(){groupURL()}
    rankButton.onclick = function(){groupURL()}
}

function gameURL()
{
    var friendsDisplayNames = document.getElementsByClassName("text-name text-overflow")
    let profileApiURL

    for (let i = 0; i < friendsDisplayNames.length; i++)
    {
        
        profileApiURL = "https://api.roblox.com/users/" + friendsDisplayNames[i].href.substring(29, friendsDisplayNames[i].href.lastIndexOf('/'))
        $.getJSON(profileApiURL, function(data){

            friendsDisplayNames[i].innerHTML = data.Username
            friendsDisplayNames[i].title = data.Username
        })

    }
}

function wait(waitsecs) {
    setTimeout(function(){}, waitsecs);
}
