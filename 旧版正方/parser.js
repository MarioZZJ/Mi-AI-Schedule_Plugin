function weekStr2IntList(week) {
  // 将全角逗号替换为半角逗号
  let reg = new RegExp("，", "g");
  week.replace(reg, ',');
  let weeks = [];

  // 以逗号为界分割字符串，遍历分割的字符串
  week.split(",").forEach(w => {
      if (w.search('-') != -1) {
          let range = w.split("-");
          let start = parseInt(range[0]);
          let end = parseInt(range[1]);
          for (let i = start; i <= end; i++) {
              if (!weeks.includes(i)) {
                  weeks.push(i);
              }
          }
      } else if (w.length != 0) {
          let v = parseInt(w);
          if (!weeks.includes(v)) {
              weeks.push(v);
          }
      }
  });
  return weeks;
}

function getTime(text, start, span) {
  let t = text.replace('{', '').replace('}', '').split('第');
  const weekdays = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日']

  let weekday = 0;
  let sections = [];
  let week = [];

  // 从元素位置和属性推断出节次
  for (let i = start; i < start + span; i++) {
      sections.push({
          section: i
      });
  }

  // 有时候数据错误，得处理下
  if (t.length == 0) {
      week = [...new Array(100).keys()];
  } else if (t.length == 2) {
      week = weekStr2IntList(text.split('|')[0].replace('{', '').replace('第', '').replace('周', ''));
  } else {
      let weekdayStr = t[0];
      let jcStr = t[1];
      let weekStr = t[2];

      weekday = weekdays.indexOf(weekdayStr)

      // 如果课程有节次信息，以节次信息为准
      let list = jcStr.replace('节', '').split(',');
      sections.length = 0;
      list.forEach(v => {
          sections.push({
              section: parseInt(v)
          });
      });

      weekStr = weekStr.replace('周');
      let flag = 0;
      if (weekStr.search('单') != -1) {
          weekStr = weekStr.replace('|单', '');
          flag = 1;
      } else if (weekStr.search('双') != -1) {
          weekStr = weekStr.replace('|双', '');
          flag = 2;
      }
      if (flag == 1) {
          week = weekStr2IntList(weekStr).filter(v => v % 2 != 0);
      } else if (flag == 2) {
          week = weekStr2IntList(weekStr).filter(v => v % 2 == 0);
      } else {
          week = weekStr2IntList(weekStr);
      }
  }

  return {
      weekday: weekday,
      sections: sections,
      week: week
  };
}

function scheduleHtmlParser(html) {
  var $ = cheerio.load(html, { decodeEntities: false });
  let result = [];

  $('#Table1').find('tbody').find('tr').each(function (row, _) {
      // 跳过前面两行
      if (row > 1) {
          let offset = 0; //星期的偏移量
          $(this).find('td').each(function (col, _) {
              if ($(this).text().length <= 4 && $(this).text().length > 0) {
                  offset++;
              } else {
                  let infos = $(this).html().split('<br>');
                  infos = infos.filter(e => e.length != 0);

                  let hasNext = true;
                  let index = 0;
                  while (hasNext) {
                      let name = infos[index];
                      let teacherName = infos[index + 2];
                      let place = infos[index + 3];
                      let span = parseInt($(this).attr('rowspan'));
                      let time = getTime(infos[index + 1], row - 1, span);
                      let weekday = time.weekday;

                      // 存在没有星期的情况，通过元素位置判断星期
                      if (weekday == 0) {
                          weekday = col - offset + 1;
                      }

                      // 构建课程，添加至结果
                      let course = {
                          name: name,
                          position: place,
                          teacher: teacherName,
                          weeks: time.week,
                          day: weekday,
                          sections: time.sections,
                      };
                      //console.info(course);
                      result.push(course);

                      if (infos[index + 4] != undefined) {
                          index += 4;
                      } else {
                          hasNext = false;
                      }
                  }

                  console.log(infos);
              }
          });
      }
  });

  console.info(result);

  return { courseInfos: result }
}