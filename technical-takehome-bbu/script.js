function handleDate(date) {
    // convert to full word
    const days = {
        "Mon": "Monday", "Tue": "Tuesday", "Wed": "Wednesday", "Thu": "Thursday", "Fri": "Friday", "Sat": "Saturday", "Sun": "Sunday"
    }
    const month = {
        "Jan": "January", "Feb": "February", "Mar": "March", "Apr": "April", "May": "May", "Jun": "June", 
        "Jul": "July", "Aug": "August", "Sep": "September", "Oct": "October", "Nov": "November", "Dec": "December"
    }
    // date in form "yyyy-MM-dd"
    const dateObject = new Date(date)
    const dateString = dateObject.toDateString().split(" ")
    // dateString in form ["weekday", "month", "dd", "yyyy"]
    const day = parseInt(dateString[2]) + 1
    const finalDate = days[dateString[0]] + ", " + month[dateString[1]] + " " + day.toString() + "th, " + dateString[3]
    return finalDate
}

function handlePosts([posts, users]) {
    // sort posts by date
    posts.sort(function (a, b) {
        return Date.parse(b.date, "yyyy-MM-dd") - Date.parse(a.date, "yyyy-MM-dd")
    });

    // create object for user ids
    const userIds = {};
    for (const user of users) {
        userIds[user.id] = {"username": user.username, "profile_photo": user.profile_photo};
    }

    // create post
    for (const post of posts) {
        const id = post.id

        // set html elements
        const li = document.createElement("li")
        const bar = document.createElement("div")
        const pfp = document.createElement("div")
        const right = document.createElement("div")
        const userName = document.createElement("div")
        const timeStamp = document.createElement("div")
        let photo = document.createElement("img")
        let userid = document.createElement("h3")
        let timestamp = document.createElement("h5")
        let content = document.createElement("p")

        // set elements to value
        photo.setAttribute("src", `photos/${userIds[id].profile_photo}`)
        userid.textContent = `@${userIds[id].username}`
        timestamp.textContent = handleDate(post.date)
        content.textContent = post.content

        // set class for styling
        bar.setAttribute("class", "parent")
        pfp.setAttribute("class", "child")
        pfp.setAttribute("id", "profilepic")
        right.setAttribute("class", "child")
        right.setAttribute("id", "right")
        userName.setAttribute("id", "username")
        timeStamp.setAttribute("id", "timestamp")

        // add elements to div element
        pfp.appendChild(photo)
        userName.appendChild(userid)
        timeStamp.appendChild(timestamp)
        right.appendChild(userName)
        right.appendChild(timeStamp)
        bar.appendChild(pfp)
        bar.appendChild(right)
        // add elements to list element
        li.appendChild(bar)
        li.appendChild(content)

        // add to unsorted list
        document.getElementById("posts").appendChild(li)
    }

}

// read posts and users .json
let finalResult;
const urls = ["posts", "users"];
Promise.all(
    urls.map(url =>
        fetch(url + ".json")
            .then(response => response.json())
        )
    ).then(handlePosts)

console.log(finalResult);