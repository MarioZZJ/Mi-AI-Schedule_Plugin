/*! 版权归我所有 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('woshi   background')\nlet mode = 'self'\n\nlet connections = {}\n// let url = 'http:127.0.0.1:50017'\nlet url = 'https://open-schedule.ai.xiaomi.com'\nfunction post(url, data, headers) {\n    return fetch(url, {\n        body: JSON.stringify(data),\n        headers,\n        method: \"POST\",\n    }).then(response => { if (response.status == 200) { return response.json() } else { throw new Error(response.status) } })\n}\nfunction get(url, headers) {\n    return fetch(url, {\n        headers,\n        method: \"GET\",\n    }).then(response => {\n        console.log(response.headers.get(\"content-type\"))\n        if (response.headers.get(\"content-type\").indexOf(\"application/json\") > -1) {\n            return response.json()\n        } else {\n            return response\n        }\n    })\n}\nfunction sendMessageToContentScript(message, callback) {\n    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {\n        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {\n            if (callback) callback(response);\n        });\n    });\n}\n\nchrome.contextMenus.create({\n    title: '运行函数',\n    id: '1'\n    , onclick: function () {\n        sendMessageToContentScript({ cmd: 'provider', value: '你好，我是爸爸！', mode }, function (response) {\n            console.log('来自content的回复：' + response);\n        });\n    }\n});\n\n// chrome.contextMenus.create({\n//     title: \"重新加载扩展\",\n//     parentId: '1',\n//     onclick: function () {\n//         sendMessageToContentScript({ cmd: 'refresh', value: '你好，我是爸爸！' }, function (response) {\n//             console.log('来自content的回复：' + response);\n//             chrome.runtime.reload();\n//         });\n//     }\n// });\n// chrome.contextMenus.create({\n//     title: \"运行\",\n//     parentId: '1',\n//     onclick: function () {\n//         sendMessageToContentScript({ cmd: 'provider', value: '你好，我是爸爸！' }, function (response) {\n//             console.log('来自content的回复：' + response);\n//         });\n//     }\n// });\n\n// chrome.contextMenus.create({\n//     title: \"上传\",\n//     parentId: '1',\n//     onclick: function () {\n\n//     }\n// sendMessageToContentScript({ cmd: 'upload', value: '你好，我是爸爸！' }, function (response) {\n//     console.log('来自content的回复：' + response);\n// });\n\n// });\n\nchrome.runtime.onConnect.addListener(function (port) {\n    const extensionListener = function (message, sender, sendResponse) {\n        console.log(message, sender.id)\n        connections[message.tabId] = port;\n        if (message.name == 'login') {\n            window.open('https://account.xiaomi.com/pass/serviceLogin?callback=https%3A%2F%2Fopen-schedule.ai.xiaomi.com%2Fsts%3Fsign%3DCgKc5TbNWp1A66mDX7AGxu7Om0o%3D%26followup%3Dhttps%3A%2F%2Fopen-schedule.ai.xiaomi.com%2Fssocheck&sid=openSchedule', '小米账号登陆', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes')\n            for (let tabId in connections) {\n                connections[tabId].postMessage(message);\n            }\n\n        }\n\n        if (message.name == 'userId') {\n\n            chrome.cookies.get({ url: 'https://open-schedule.ai.xiaomi.com/', name: 'userId' }, function (aaa) {\n                for (let tabId in connections) {\n                    connections[tabId].postMessage({ name: 'userId', msg: aaa && aaa.value ? 'hi,' + aaa.value : 'login' });\n                }\n\n            })\n\n        };\n        if (message.name == 'data') {\n            let reqURL = ''\n            reqURL = message.mode == 'self' ? url + '/api/mypost' : url + '/api/adapting'\n            get(reqURL).then(function (myTbs) {\n\n                myTbs = myTbs && myTbs.length && myTbs.length > 0 ? myTbs : []\n\n                for (let tabId in connections) {\n                    console.log('请求一下数据嗷嗷嗷')\n                    console.log(connections)\n                    connections[tabId].postMessage({ name: 'tbs', myTbs: myTbs });\n                }\n            }).catch(function () {\n                for (let tabId in connections) {\n                    connections[tabId].postMessage({ name: 'tbs', myTbs: [] });\n                }\n            })\n        };\n        if (message.name == 'html') {\n            let reqURL = url + `/api/page?tb_id=${message.id}`\n            // reqURL = message.mode == 'self' ? url + '/api/mypost' : url + '/api/adapting'\n\n            get(reqURL).then(function (myTbs) {\n                for (let tabId in connections) {\n                    connections[tabId].postMessage({ name: 'html', myTbs: myTbs.page });\n                }\n            }).catch(function () {\n            })\n        };\n        if (message.name == 'fetchMode') {\n\n            for (let tabId in connections) {\n                connections[tabId].postMessage({ name: 'fetchMode', mode });\n            }\n\n        };\n        if (message.name == 'mode') {\n            mode = message.mode\n        };\n        if (message.name == 'upload') {\n            chrome.storage.local.get({ html: '' }, function (items1) {\n                chrome.storage.local.get({ current: '' }, function (items2) {\n                    if (!items2.current) {\n                        return alert('请先选定您的学校')\n                    }\n                    if (window.confirm(`确定要上传${items2.current.school.school_name}-${items2.current.eas}的适配项目吗`)) {\n                        post(url + '/api/files', {\n                            \"url\": items2.current.url,\n                            \"school_name\": items2.current.school.school_name,\n                            eas: items2.current.eas,\n                            \"provider_html\": items2.current.provider_html,\n                            \"parser\": items2.current.parser,\n                            status: 0, isvalid: 0,\n                            html: items1.html,\n                            score: mode == 'else' ? 1024 : 0\n                        }, { 'Content-Type': 'application/json' }).then(function (result) {\n\n                            if (result.code == 0) {\n                                alert('上传成功')\n                                console.log(\"%c 上传成功\", \"color:green;font-size:38px;\");\n\n                            } else if (result.code == 400) {\n                                alert('您未在白名单中')\n                            }\n                            else if (result.code == 401) {\n                                alert('请您先登陆')\n                                window.open('https://account.xiaomi.com/pass/serviceLogin?callback=https%3A%2F%2Fopen-schedule.ai.xiaomi.com%2Fsts%3Fsign%3DCgKc5TbNWp1A66mDX7AGxu7Om0o%3D%26followup%3Dhttps%3A%2F%2Fopen-schedule.ai.xiaomi.com%2Fssocheck&sid=openSchedule', '小米账号登陆', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes')\n                            }\n                            let reqURL = ''\n                            reqURL = message.mode == 'self' ? url + '/api/mypost' : url + '/api/adapting'\n                            get(reqURL).then(function (myTbs) {\n                                myTbs = myTbs && myTbs.length && myTbs.length > 0 ? myTbs : []\n                                for (let tabId in connections) {\n                                    connections[tabId].postMessage({ name: 'tbs', myTbs: myTbs });\n                                }\n                            }).catch(function () {\n                                for (let tabId in connections) {\n                                    connections[tabId].postMessage({ name: 'tbs', myTbs: [] });\n                                }\n                            })\n                        }).catch(function (err) {\n                            console.log(err.message)\n                            if (err.message == 400) {\n                                alert('参数错误')\n                            } else {\n                                alert('服务器错误，请先保存您的修改')\n                            }\n                        })\n                    }\n                })\n            })\n        }\n        if (message.name == 'fetchSchool') {\n\n            get(url + '/api/schools/list?school_name=' + message.msg).then(function (schools) {\n                for (let tabId in connections) {\n                    connections[tabId].postMessage({ name: 'schools', msg: schools });\n                }\n            })\n        }\n        if (message.name == 'update') {\n            console.log('nima')\n            get('https://github.com/jiazhonglin/AISchedule-Devtools').then(function (schools) {\n                let currentVersion = chrome.app.getDetails().version\n                let aaa = schools.url.split('-').pop().split('.').join('')\n                let bbb = currentVersion.split('.').join('')\n                console.log(aaa)\n                console.log(bbb)\n                if (aaa > bbb) {\n                    for (let tabId in connections) {\n                        connections[tabId].postMessage({ name: 'newVersion' });\n                    }\n                }\n            }).catch(function (err) {\n                console.log(err)\n            })\n        }\n    }\n    port.onMessage.addListener(extensionListener);\n    port.onDisconnect.addListener(function (port) {\n        port.onMessage.removeListener(extensionListener);\n        const tabs = Object.keys(connections);\n        for (let i = 0, len = tabs.length; i < len; i++) {\n            if (connections[tabs[i]] == port) {\n                delete connections[tabs[i]];\n                break;\n            }\n        }\n    });\n});\n\nchrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {\n\n    console.log(sender)\n    console.log(connections)\n\n    if (message.name == 'onunload' && Object.keys(connections) > 0) {\n        connections[sender.tab.id].postMessage({ name: 'onunload', msg: {} });\n    }\n    if (message.name == 'testParser') {\n        console.log(message, sender.tab.id, sendResponse)\n        let courseInfos = message.msg.courseInfos.map(function (course) {\n            return Object.assign({}, course, {\n                deviceId: 'c53d7414fb6ecbbecd3e81394622f988',\n                userId: 0,\n                day: Number(course.day),\n                weeks: course.weeks.toString(),\n                sections: course.sections.map(function (section) {\n                    return section.section\n                }).toString()\n            })\n        })\n        courseInfos = courseInfos[Math.floor(Math.random() * courseInfos.length)]\n        post('https://i.ai.mi.com/course/courseInfos', {\n            \"first\": 1,\n            courseInfos: [courseInfos]\n        }, { 'Content-Type': 'application/json' }).then(function (result) {\n            console.log('done')\n\n            chrome.tabs.sendMessage(sender.tab.id, { cmd: 'testParser', value: result, schedule: message.msg }, function (response) {\n            });\n        }).catch(function (err) {\n            console.log('notdone')\n            chrome.tabs.sendMessage(sender.tab.id, { cmd: 'testParser', value: err }, function (response) {\n            });\n\n        })\n    }\n\n    sendResponse('ok');\n    // if (message.name == 'parser') {\n    //     chrome.storage.local.get({ current: '' }, function (items2) {\n    //         if (!items2) {\n    //             return alert('您的提交不符合规范')\n    //         }\n    //         if (a == true) {\n    //             post(url + '/api/files', {\n    //                 \"url\": message.msg.url,\n    //                 \"school_name\": items2.school.school_name,\n    //                 eas: items2.eas,\n    //                 \"provider_html\": message.msg.provider,\n    //                 \"parser\": message.msg.parser,\n    //                 status: 0, isvalid: 0,\n    //                 html: message.msg.html\n    //             }, { 'Content-Type': 'application/json' }).then(function (result) {\n\n    //                 if (result.code == 0 && message.name == 'parser') {\n    //                     alert('上传成功')\n    //                     console.log(\"%c 上传成功\", \"color:green;font-size:38px;\");\n\n    //                 }\n    //                 else if (result.code == 401 && message.name == 'parser') {\n    //                     alert('请您先登陆')\n    //                     window.open('https://account.xiaomi.com/pass/serviceLogin?callback=https%3A%2F%2Fopen-schedule.ai.xiaomi.com%2Fsts%3Fsign%3DCgKc5TbNWp1A66mDX7AGxu7Om0o%3D%26followup%3Dhttps%3A%2F%2Fopen-schedule.ai.xiaomi.com%2Fssocheck&sid=openSchedule', '小米账号登陆', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes')\n    //                 } else if (message.name == 'parser') {\n    //                     alert('服务器错误，请先保存您的修改')\n    //                 }\n    //                 get(url + '/api/mypost').then(function (myTbs) {\n    //                     console.log(myTbs)\n    //                     for (let tabId in connections) {\n    //                         connections[tabId].postMessage({ name: 'tbs', myTbs: myTbs });\n    //                     }\n    //                 })\n    //             }).catch(function (err) {\n    //                 console.log(err.message)\n    //                 if (err.message == 400) {\n    //                     alert('请勿修改已上线的适配，或者丢失参数')\n    //                 } else {\n    //                     alert('服务器错误，请先保存您的修改')\n\n    //                 }\n    //             })\n    //         } else {\n    //             alert('请到Devtools->AISchedule中修改学校或教务系统')\n    //         }\n    //     })\n    // }\n    // sendResponse('我是后台，我已收到你的消息：');\n});\n\n//# sourceURL=webpack:///./src/js/background.js?");

/***/ })

/******/ });