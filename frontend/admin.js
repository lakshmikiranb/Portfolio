let token = "";

async function login() {
    const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: user.value,
            password: pass.value
        })
    });

    const data = await res.json();
    token = data.token;

    alert("Login success");
}

async function upload() {
    const form = new FormData();
    form.append("resume", file.files[0]);

    await fetch("http://localhost:5000/resume/upload", {
        method: "POST",
        headers: {
            Authorization: token
        },
        body: form
    });

    alert("Resume uploaded");
}