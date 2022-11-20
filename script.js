document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#form');
    const input = form.querySelector('.form-control');
    const btn = form.querySelector('.btn-primary');
    const taskWrapper = document.querySelector('#tasksList');
    let listBD = [];

    if (localStorage.getItem('listBD')) {
        listBD = JSON.parse(localStorage.getItem('listBD'));
        addAndDeleteTasks(listBD, taskWrapper);
    };

    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            taskTitle: input.value,
            done: false
        }
        if (input.value == '') {
            alert('добавте новую задачу');
        } else {
            listBD.push(newTask);
            input.value = '';
        }

        addAndDeleteTasks(listBD, taskWrapper);
        localStorage.setItem('listBD', JSON.stringify(listBD));

    })

    taskWrapper.addEventListener('click', (e) => {

        // if (e.target.getAttribute('data-action') == "delete") {
        //     let task = e.target.closest('.task-item');
        //     let id = task.getAttribute('data-id');

        //     for (let i = 0; i < listBD.length; i++) {
        //         if (id == listBD[i].id) {
        //             listBD.splice(i, 1);
        //             break;
        //         }
        //     }
        //     addAndDeleteTasks(listBD,taskWrapper);
        //     console.log(listBD);
        //     localStorage.setItem('listBD', JSON.stringify(listBD));
        // }

        // if (e.target.getAttribute('data-action') == 'done') {
        //     let task = e.target.closest('.task-item');
        //     let id = task.getAttribute('data-id');

        //     for (let i = 0; i < listBD.length; i++) {
        //         if (id == listBD[i].id) {
        //             listBD[i].done = !listBD[i].done;
        //             break;
        //         }
        //     }
        //     console.log(listBD);
        //     addAndDeleteTasks(listBD, taskWrapper);
        //     localStorage.setItem('listBD', JSON.stringify(listBD));
        // }
    })

    function addAndDeleteTasks(arr, parent) {

        if (arr.length == 0) {
            taskWrapper.innerHTML = `
        <li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
            <div class="empty-list__title">Список дел пуст</div>
        </li>
        `;
        } else {
            parent.innerHTML = '';
            arr.forEach(item => {
                parent.innerHTML += `
            <li data-id ='${item.id}' class="list-group-item  d-flex justify-content-between task-item">
                <span class="${item.done ? 'task-title--done' : ''}">${item.taskTitle}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                    </button>
                </div>
            </li>
            `;
            });

        }

        const btnsDelete = document.querySelectorAll('[data-action="delete"]');
        btnsDelete.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                arr.splice(i, 1);
                addAndDeleteTasks(arr, parent);
                localStorage.setItem('listBD', JSON.stringify(arr));
            });
        });

        const btnDone = document.querySelectorAll('[data-action="done"]');
        btnDone.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                arr[i].done = !arr[i].done;
                addAndDeleteTasks(arr, parent);
                localStorage.setItem('listBD', JSON.stringify(arr));
            });
        });

    }































})