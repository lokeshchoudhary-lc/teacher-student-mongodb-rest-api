**Teacher-Student-System-REST-API**

_Made with :_

- Node

_Steps to run application :_

> `git clone https://github.com/lokeshchoudhary-lc/teacher-student-mongodb-rest-api.git`

> `npm install`

> `Make you own .env from .evn.example`

> `npm start`

_Npm Packages Used :_

- Expressjs
- mongoose
- https-errors
- cors
- nodemon (dev)

_Route start with `http://localhost:5000/` or `http://localhost:<specified_PORT>/`_

**Teacher Routes**

| Path          | Method | Query   | Return            |
| ------------- | ------ | ------- | ----------------- |
| 'teacher/all' | GET    | subject | all teachers list |

**_Example_ `teacher/all/`**<br>
**_Example_ `teacher/all/?subject=maths`**

| Path              | Method | Params | Return         |
| ----------------- | ------ | ------ | -------------- |
| 'teacher/one/:id' | GET    | id     | single teacher |

| Path       | Method | Body                                         | Action           |
| ---------- | ------ | -------------------------------------------- | ---------------- |
| 'teacher/' | POST   | {<br>'name',<br> 'email',<br> 'subject'<br>} | create a teacher |

| Path          | Method | Body                                         | Params | Action           |
| ------------- | ------ | -------------------------------------------- | ------ | ---------------- |
| 'teacher/:id' | PATCH  | {<br>'name',<br> 'email',<br> 'subject'<br>} | id     | update a teacher |

| Path          | Method | Params | Action           |
| ------------- | ------ | ------ | ---------------- |
| 'teacher/:id' | DELETE | id     | delete a teacher |

| Path                       | Method | Query          | Return                                 |
| -------------------------- | ------ | -------------- | -------------------------------------- |
| 'teacher/show-student/?id' | GET    | id(teacher id) | list of assigned students to a teacher |

**_Example_ `teacher/show-student/`**<br>
**_Example_ `teacher/show-student/?id=774681283nasf5e`**

| Path                      | Method | Params         | Body                   | Action                                      |
| ------------------------- | ------ | -------------- | ---------------------- | ------------------------------------------- |
| 'teacher/add-student/:id' | PUT    | id(teacher id) | {<br>'student_id'<br>} | assign a student(student_id) to teacher(id) |

**Student Routes**

| Path          | Method | Query          | Return            |
| ------------- | ------ | -------------- | ----------------- |
| 'student/all' | GET    | class, section | all students list |

**_Example_ `student/all/`**<br>
**_Example_ `student/all/?class=8`**<br>
**_Example_ `student/all/?section=A`**<br>
**_Example_ `student/all/?class=8&section=A`**

| Path              | Method | Params | Return         |
| ----------------- | ------ | ------ | -------------- |
| 'student/one/:id' | GET    | id     | single teacher |

| Path       | Method | Body                                                    | Action           |
| ---------- | ------ | ------------------------------------------------------- | ---------------- |
| 'student/' | POST   | {<br>'name',<br> 'email',<br>'class',<br>'section'<br>} | create a student |

| Path          | Method | Body                                                    | Params | Action           |
| ------------- | ------ | ------------------------------------------------------- | ------ | ---------------- |
| 'student/:id' | PATCH  | {<br>'name',<br> 'email',<br>'class',<br>'section'<br>} | id     | update a student |

| Path          | Method | Params | Action           |
| ------------- | ------ | ------ | ---------------- |
| 'student/:id' | DELETE | id     | delete a student |

| Path                    | Method | Query          | Return                                 |
| ----------------------- | ------ | -------------- | -------------------------------------- |
| 'student/show-teacher/' | GET    | id(student id) | list of assigned teachers to a student |

**_Example_ `student/show-teacher/?id=89381283nasf5e`**

| Path                      | Method | Params         | Body                   | Action                                      |
| ------------------------- | ------ | -------------- | ---------------------- | ------------------------------------------- |
| 'student/add-teacher/:id' | PUT    | id(student id) | {<br>'teacher_id'<br>} | assign a teacher(teacher_id) to student(id) |
