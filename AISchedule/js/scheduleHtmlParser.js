function scheduleHtmlParser(html) {
  //除函数名外都可编辑
  //传入的参数为上一步函数获取到的html
  //可使用正则匹配
  //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://cnodejs.org/topic/5203a71844e76d216a727d2e
let result=[]
let bbb=$('#table1 .timetable_con')
  for(let u=0;u<bbb.length;u++){
    let re={sections:[],weeks:[]}
  let aaa=$(bbb[u]).find('span')
let week=$(bbb[u]).parent('td')[0].attribs.id
if(week){
re.day=week.split('-')[0]
}
      for(let i=0;i<aaa.length;i++){

  if(aaa[i].attribs.title=='上课地点'){

      for(let j=0;j<$(aaa[i]).next()[0].children.length;j++){
         re.position=$(aaa[i]).next()[0].children[j].data
      }
  }
if(aaa[i].attribs.title=='节/周'){

      for(let j=0;j<$(aaa[i]).next()[0].children.length;j++){

        let lesson=$(aaa[i]).next()[0].children[j].data
          for (let a=Number(lesson.split(')')[0].split('(')[1].split('-')[0]);a<Number(lesson.split(')')[0].split('(')[1].split('-')[1].split('节')[0])+1;a++){

            re.sections.push({section:a})
          }
           for (let a=Number(lesson.split(')')[1].split('-')[0]);a<Number(lesson.split(')')[1].split('-')[1].split('周')[0])+1;a++){

            re.weeks.push(a)
          }
      }
  }

if(aaa[i].attribs.title=='教师'){

      for(let j=0;j<$(aaa[i]).next()[0].children.length;j++){
          re.teacher=$(aaa[i]).next()[0].children[j].data
      }
  }

  if(aaa[i].attribs.class=='title'){

      for(let j=0;j<$(aaa[i]).children()[0].children.length;j++){
          re.name=$(aaa[i]).children()[0].children[j].data

      }
  }

 }
result.push(re)
  }
             console.log(result)

  return {courseInfos:result} 
}