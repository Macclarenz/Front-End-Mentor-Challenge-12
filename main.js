
// DARK LIGHT THEME SWITCH
const themeMode = document.querySelector('.header-theme-btn')

themeMode.addEventListener('click', (e) => {
    const body = document.querySelector('body')
    body.classList.toggle('dark-mode')

    if (body.classList.contains('dark-mode')) {
        e.target.src = './images/icon-sun.svg';
    } else {
        e.target.src = './images/icon-moon.svg';
    }
})


// CREATE LIST ITEM
const form = document.querySelector('#myForm')
const inputCreateList = document.querySelector('.create-todo-text')
form.addEventListener('submit', createList)

function createList(e) {
    const listContainer = document.querySelector('.todo-list')

    if (inputCreateList.value) {
        const createLi = document.createElement('li');
        createLi.classList.add('todo-item-container')
        listContainer.appendChild(createLi)

        createLi.innerHTML = `
    <a href="#" class='todo-item-btn' aria-roledescription="check button"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></a>
    <p class="todo-item-name">${inputCreateList.value}</p>
    <a href="#" class = 'todo-item-remove-btn'><img src="./images/icon-cross.svg" alt="X icon"></a>
    
    `
        inputCreateList.value = ''
        inputCreateList.placeholder = 'Create a new todo'

        createAnimation(createLi)
    } else {
        inputCreateList.placeholder = 'Input must not be empty'
    }

    

    itemsLeft()

    e.preventDefault()
}


// CHECK / REMOVE EVENT
function checkEvent() {
    const list = document.querySelector('.todo-list')
    list.addEventListener('click', e => {
        if (e.target.matches('a.todo-item-btn')) {
            e.target.classList.toggle('checked')
            e.target.parentNode.classList.toggle('completed')

            itemsLeft()
        } else if (e.target.matches('a.todo-item-remove-btn')) {
            const removeElement = e.target.parentNode
            removeAnimation(removeElement)

            if (!removeElement.classList.contains('completed')) {
                itemsLeft(1)
            } 
        }
        e.preventDefault()
    })
}

checkEvent()


// ITEMS LEFT COUNT
function itemsLeft(i = 0) {
    const countItemLeft = document.querySelector('.items-left')
    let listArr = Array.from(document.querySelectorAll('.todo-item-container'))

    const currentItem = listArr.filter(el => {
        if (!el.classList.contains('completed')) {
            return el
        }
    })

    countItemLeft.innerText = currentItem.length - i
}

itemsLeft()


// CLEAR COMPLETED
const clearCompletedBtn = document.querySelector('.btn-clear-complete')
clearCompletedBtn.addEventListener('click', clearCompleted)

function clearCompleted() {
    const list = document.querySelectorAll('.todo-item-container')

    list.forEach(el => {
        if (el.classList.contains('completed')) {
            removeAnimation(el)
        }
    })

    itemsLeft()
}


// ALL BUTTON
const allBtn = document.querySelector('.btn-all')
allBtn.addEventListener('click', e => {
    removeHide()
    removeActive()
    e.target.classList.add('active')

    const listItem = document.querySelectorAll('.todo-item-container')
    listItem.forEach((el) => {
        reverseAnimation(el)
    })
})


// ACTIVE BUTTON
const activeBtn = document.querySelector('.btn-active')
activeBtn.addEventListener('click', e => {
    removeHide()
    removeActive()
    e.target.classList.add('active')

    const listItem = document.querySelectorAll('.todo-item-container')
    listItem.forEach((el) => {
        if (el.classList.contains('completed')) {
            listAnimation(el)
        } else {
            reverseAnimation(el)
        }
    })
})


// COMPLETED BUTTON
const completedBtn = document.querySelector('.btn-complete')
completedBtn.addEventListener('click', e => {
    removeHide()
    removeActive()
    e.target.classList.add('active')

    const listItem = document.querySelectorAll('.todo-item-container')
    listItem.forEach((el) => {
        if (!el.classList.contains('completed')) {
            listAnimation(el)
        } else {
            reverseAnimation(el)
        }
    })
})


// REMOVE ACTIVE BUTTON EVENT
function removeActive() {
    const allBtn = document.querySelectorAll('.btn-smaller-container button')

    allBtn.forEach(e => {
        e.classList.remove('active')
    })
}


// REMOVE ALL HIDDEN LIST ITEM
function removeHide() {
    const listItem = document.querySelectorAll('.todo-item-container')

    listItem.forEach(el => {
        el.classList.remove('hidden')
    })
}


// ANIMATION
function createAnimation(element) {
    const tl = gsap.timeline({defaults: {ease: 'Power1.out.easeNone'}})

    tl.fromTo(element, 
        {opacity: 0, x: 100, overflow: 'hidden', padding: 0, maxHeight: 0}, 
        {opacity: 1, x: 0, overflow: 'visiblie', padding: '1em', maxHeight: 'max-content', duration: .5})
}

function removeAnimation(element) {
    const tl = gsap.timeline(
        {defaults: {ease: 'Power2.out.easeOut'}}
    )

    tl.to(element, {opacity: 0, duration: .25, x: 100})
    tl.to(element, {duration: .25, maxHeight: 0, overflow: 'hidden', padding: 0})

    // REMOVES ELEMENT
    tl.to(element, {remove: () => {element.remove()}})
}

function listAnimation(element) {
    const tl = gsap.timeline(
        {defaults: {ease: 'power0.out.easeNone'}}
    )

    tl.to(element, {opacity: 0, duration: .5, x: 100})
    tl.to(element, {duration: .25, maxHeight: 0, overflow: 'hidden', padding: 0})
}

function reverseAnimation(element) {
    const tl = gsap.timeline(
        {defaults: {ease: 'power0.out.easeNone'}}
    )

    tl.to(element, {duration: .5, maxHeight: 'max-content', overflow: 'visible', padding: '1em'})
    tl.to(element, {opacity: 1, x: 0, duration: .5})

}


// SORTABLE (DRAG & DROP)
const todoList = document.querySelector('.todo-list')
new Sortable (todoList, {
    animation: 350
})