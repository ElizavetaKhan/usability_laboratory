export default class ProjectService {
    static async getAllProjects() {
        return fetch("https://protocol.lavro.ru/public_html/PHP/getProjects.php")
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async getAllUsers() {
        return fetch("https://protocol.lavro.ru/public_html/PHP/getUsers.php")
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async getAllAudio(session) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/getAllAudio.php", {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session: session})
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async getProjectById(id) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/getProjectById.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id})
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return [result.res1,result.res2,result.res3,result.res4,result.res5, result.res6];
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async getAllMarkersAndPauses(session) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/getMarkersAndPauses.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: session,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return [result.res1, result.res2, result.res3];
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async editMarker(id_marker, comment) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/editMarker.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_marker: id_marker,
                comment: comment,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async editType(typeToChange, proj, newType) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/editType.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                typeToChange: typeToChange,
                proj: proj,
                newType: newType
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async editProjectName(proj, newName) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/editProjectName.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                proj: proj,
                newName: newName
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async editProjectComment(proj, newComment) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/editProjectComment.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                proj: proj,
                newComment: newComment
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async editTaskName(proj, newTask, oldTask) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/editTaskName.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                proj: proj,
                newTask: newTask,
                oldTask: oldTask
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async editRespondent(session, newResp) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/editRespondent.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: session,
                newResp: newResp,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async relocateMarker(id_marker, newTime) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/relocateMarker.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_marker: id_marker,
                newTime: newTime,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async changeVideoInSession(session, newLink) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/changeVideoInSession.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: session,
                newLink: newLink,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async addMarker(comment, type, time, session) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/addMarker.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: comment,
                type: type,
                time: time,
                session: session,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async addNewSession(respondent, project) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/addNewSession.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                respondent: respondent,
                project: project,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async addProject(name, comment, tasks, count) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/addNewProject.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                comment: comment,
                tasks: tasks,
                count: count
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async addTask(project, newTask) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/addTask.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project: project,
                newTask: newTask,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async dropTask(project, newTask) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/dropTask.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project: project,
                newTask: newTask,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async dropAccess(project, login) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/dropAccess.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project: project,
                login: login,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async dropSession(session) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/dropSession.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: session,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async dropMarker(id_marker) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/dropMarker.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_marker: id_marker,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async dropProject(id) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/dropProject.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async giveAccess(project, newLog, access) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/giveAccess.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project: project,
                newLog: newLog,
                access: access
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async startSession(session) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/startSession.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: session
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async startPause(session) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/startPause.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: session,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async endPause(session) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/endPause.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: session,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async uploadVideoLink(session, link) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/uploadVideoLink.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: session,
                link: link,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async setAudioShift(audio, shift) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/setAudioShift.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                audio: audio,
                shift: shift,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async uploadAudioName(session, name) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/uploadAudioName.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: session,
                name: name,
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async authorization(lg, pw) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/authorization.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lg: lg,
                pw: pw
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }

    static async registration(lg, pw) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/registration.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lg: lg,
                pw: pw
            })
        })
            .then(
                async res => {
                    if (res) {
                        return await res.json();
                    } else {
                        return null;
                    }
                }
            )
            .then(
                (result) => {
                    return result;
                },

                (error) => {
                    console.warn(error);
                }
            )
    }
}