function scheduleHtmlParser() {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
    let result = [];
    let temp = [];
    let record = [];
    let listtable = $('#_ctl1_dgStudentLesson tbody').find('tr')
    for (let u = 1; u < listtable.length; u++) {
        let re = {};
        let cell = $(listtable[u]).find('td');
        re.name = $(cell[1]).html();
        re.teacher = $(cell[3]).html()
        temp.push(re);
    }
    // alert("2表加载完成")

    let schedule = $('#_ctl1_NewKcb table tbody').find('tr');
    for (let v = 1; v < schedule.length;v++) {
        row = $(schedule[v]).find('td');
        if(v == 1 || v == 6 || v == 8){

            for(let w = 2; w < row.length; w++){
                if($(row[w]).find('div').html() !== '&amp;nbsp;' && $(row[w]).find('div').html() !== '&nbsp;'){
                let re={sections:[],weeks:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]};
                re.name = $(row[w]).find('div').html().split('<br>')[0];
                re.position = $(row[w]).find('div').html().split('<br>')[1];
                if(v == 1){
                    re.sections.push({ section: 1 });
                    re.sections.push({ section: 2 });
                }else if(v == 6){
                    re.sections.push({ section: 6 });
                    re.sections.push({ section: 7 });
                }else if(v == 8){
                    re.sections.push({ section: 10 });
                    re.sections.push({ section: 11 });
                }

                for(let i=0;i< temp.length;i++){
                    if(temp[i].name == $(row[w]).find('div').html().split('<br>')[0]){
                        re.teacher = temp[i].teacher;
                    }
                }
                re.day = (w-1)+'';
                // alert(JSON.stringify(re));
                result.push(re);
            }
            }
        }else if(v == 5 || v == 9){

        }else{
            for(let w = 1; w < row.length;w++){
                if($(row[w]).find('div').html() !== '&amp;nbsp;' && $(row[w]).find('div').html() !== '&nbsp;'){
                let re={sections:[],weeks:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]};
                re.name = $(row[w]).find('div').html().split('<br>')[0];
                re.position = $(row[w]).find('div').html().split('<br>')[1];
                if(v == 7){
                    re.sections.push({ section: 8 });
                    re.sections.push({ section: 9 });
                }else{
                    re.sections.push({ section: v });
                }
                for(let i=0;i< temp.length;i++){
                    if(temp[i].name == $(row[w]).find('div').html().split('<br>')[0]){
                        re.teacher = temp[i].teacher;
                    }
                }
                re.day = (w)+'';
                // alert(JSON.stringify(re));
                result.push(re);
            }}
        }

    }
    //还差去重
    console.log(temp)
    console.log(result)
    // alert("成功！")
    return { courseInfos: result }
}

$(function(){
    // alert($('#_ctl1_dgStudentLesson').html())
    scheduleHtmlParser();
})