const express = require('express');
const mysql = require('mysql2');
const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student_db',
});

// Check MySQL connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL!');
        connection.release(); 
    }
});

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Send your HTML file
    res.sendFile(__dirname + '/index.html');  //directly calling the html file
});

app.get('/admin-page.html', (req, res) => {
    res.sendFile(__dirname + '/admin-page.html');  
});
app.get('/dashboard.html', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html'); 
});
app.get('/add_student.html', (req, res) => {
    res.sendFile(__dirname + '/add_student.html'); 
});
app.get('/add_subject.html', (req, res) => {
    res.sendFile(__dirname + '/add_subject.html');  
});
app.get('/add_marks.html', (req, res) => {
    res.sendFile(__dirname + '/add_marks.html');  
});

// Insert data
app.post('/students/add', (req, res) => {
    const { usn, sname } = req.body;
    pool.query('INSERT INTO students (usn, sname) VALUES (?, ?)', [usn, sname], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return; 
        }
        res.json({ message: 'Data inserted successfully' });
    });
});

app.post('/subjects/add', (req, res) => {
    const { subject_code, subject_name, department } = req.body;
    pool.query('INSERT INTO subjects (subject_code, subject_name, department) VALUES (?, ?, ?)', [subject_code, subject_name, department], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return; 
        }
        res.json({ message: 'Data inserted successfully' });
    });
});

app.post('/marks/add', (req, res) => {
    const { usn, subject_code, semester, marks_obtained } = req.body;
    pool.query('INSERT INTO marks (usn, subject_code, semester, marks_obtained) VALUES (?, ?, ?, ?)', [usn, subject_code, semester, marks_obtained], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return; 
        }
        res.json({ message: 'Data inserted successfully' });
    });
});

// Select all data
app.get('/students', (req, res) => {
    pool.query('SELECT * FROM students', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});
app.get('/subjects', (req, res) => {
    pool.query('SELECT * FROM subjects', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});
app.get('/marks', (req, res) => {
    pool.query('SELECT * FROM marks', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});
app.get('/count', (req, res) => {
    pool.query('CALL CountStudentsAndSubjects', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // console.log(results[0]);
        res.json(results[0]);
    });
});

// Select a single data entry by ID
app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM students WHERE usn = ?', id, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // console.log('All data:', results);
        // res.json(results);
        res.json(results[0]); 
    });
});
app.get('/subjects/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM subjects WHERE subject_code = ?', id, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // console.log('All data:', results);
        // res.json(results);
        res.json(results[0]); 
    });
});
app.get('/marks/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM marks WHERE mark_id = ?', id, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // console.log('All data:', results);
        // res.json(results);
        res.json(results[0]); 
    });
});

// updating by id
app.put('/students/update/:id', (req, res) => {
    const id = req.params.id;
    const usn = req.body.usn;
    const sname = req.body.sname; 

    pool.query('UPDATE students SET usn = ?, sname = ? WHERE usn = ?', [usn, sname, id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data updated successfully' });
    });
});
app.put('/subjects/update/:id', (req, res) => {
    const id = req.params.id;
    const subject_code = req.body.subject_code;
    const subject_name = req.body.subject_name; 
    const department = req.body.department; 

    pool.query('UPDATE subjects SET subject_code = ?, subject_name = ?, department = ? WHERE subject_code = ?', [subject_code, subject_name, department, id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data updated successfully' });
    });
});
app.put('/marks/update/:id', (req, res) => {
    const id = req.params.id;
    const usn = req.body.usn;
    const subject_code = req.body.subject_code; 
    const semester = req.body.semester;
    const marks_obtained = req.body.marks_obtained; 

    pool.query('UPDATE marks SET usn = ?, subject_code = ?, semester = ?, marks_obtained = ? WHERE mark_id = ?', [usn, subject_code, semester, marks_obtained, id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data updated successfully' });
    });
});

// Delete data by ID
app.delete('/students/delete/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM students WHERE usn = ?', id, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data deleted successfully' });
    });
});

app.delete('/subjects/delete/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM subjects WHERE subject_code = ?', id, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data deleted successfully' });
    });
});

app.delete('/marks/delete/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM marks WHERE mark_id = ?', id, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data deleted successfully' });
    });
});

// getting result data 
app.get('/result', (req, res) => {
    const id = req.query.id;
    const sem = req.query.sem; 
    pool.query(
        `SELECT st.sname, m.subject_code, s.subject_name, m.marks_obtained
        FROM marks m
        JOIN subjects s ON m.subject_code = s.subject_code
        JOIN students st ON m.usn = st.usn
         WHERE m.usn = ? AND m.semester = ?`,
        [id, sem],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json(results); // Sending all results
        }
    );
});

let PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on port',PORT);
});
