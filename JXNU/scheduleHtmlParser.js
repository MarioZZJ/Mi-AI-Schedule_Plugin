function sortDay(a,b){
    if(a.day == b.day) {
        return a.sections[0].section - b.sections[0].section
    }else {return a.day-b.day}
}
function scheduleHtmlParser(html) {
    let result = []
    let courseNteacher = []
    const $ = cheerio.load(html,{decodeEntities: false});
    $('#_ctl1_dgStudentLesson tbody').find('tr').each(function(){//建立课程名-教师关系
        let course = {}
        let ctinfo = []
        $(this).find('td').each(function() {
            let text = $(this).text()
            ctinfo.push(text)
        })
        course.name = ctinfo[1]
        course.teacher = ctinfo[3]
        courseNteacher.push(course)
    })

    $('#_ctl1_NewKcb table tbody').find('tr').each(function(row){//获取课程信息
        $(this).find('td').each(function(column){
            let courseinfo = {}
            if($(this).attr('bgcolor') == "#66FFCC") {
                let cell = $(this).find('div').html().split('<br>');
                let cname = cell[0]
                courseinfo.name = cname
                courseinfo.position = cell[1].split('(')[0] == null ? cell[0].split('(')[0].trim():cell[1]
                courseNteacher.forEach(r => {
                    if(cname == r.name) {
                        courseinfo.teacher = r.teacher
                    }
                })
                courseinfo.weeks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
                // day sections
                let sections = []
                if (row == 1) {
                    courseinfo.day = parseInt( column - 1 )
                    sections.push( { section:1 } )
                    sections.push( { section:2 } )
                    courseinfo.sections = sections
                } else if (row == 6) {
                    courseinfo.day = parseInt( column - 1 )
                    sections.push( { section:6 } )
                    sections.push( { section:7 } )
                    courseinfo.sections = sections
                } else if (row == 8) {
                    courseinfo.day = parseInt( column - 1 )
                    sections.push( { section:10 } )
                    sections.push( { section:11 } )
                    courseinfo.sections = sections
                } else if (row == 7) {
                    courseinfo.day = parseInt( column )
                    sections.push( { section:8 } )
                    sections.push( { section:9 } )
                    courseinfo.sections = sections
                }
                else if (row == 0 || row == 5 || row == 9) {}
                else {
                    courseinfo.day = parseInt( column )
                    sections.push( { section:row+1 } )
                    courseinfo.sections = sections
                }
            result.push(courseinfo)
            }
        })
    })

    result.sort(sortDay)
    console.info(result)
    let len = result.length

    for(let i=0;i<len-2;i++) {
        if(result[i].name == result[i+2].name) {
            result[i+2].sections.forEach(function(currentValue) {
                result[i].sections.push(currentValue)
            })
            result[i+1].sections.forEach(function(currentValue) {
                result[i].sections.push(currentValue)
            })
            result.splice(i+1,2)
            len-=2
        }else if(result[i].name == result[i+1].name) {
            result[i+1].sections.forEach(function(currentValue) {
                result[i].sections.push(currentValue)
            })
            result.splice(i+1,1)
            len-=1
        }
        }

    try{if(result[len-2].name==result[len-1].name) {
        result[len-1].sections.forEach(function(currentValue){
            result[len-2].sections.push(currentValue)
        })
        result.splice(len-1,1)
        len-=1
    }}catch (e) {
       console.info(e)
    }

    // result.forEach(function(item,index,array) {
    //     console.info(result)
    //     if (item.name == array[index + 1].name) {
    //         array[index + 1].sections.forEach(function (currentValue) {
    //             item.sections.push(currentValue)
    //         })
    //         if (item.name == array[index + 2].name) {
    //             array[index + 2].sections.forEach(function (currentValue) {
    //                 item.sections.push(currentValue)
    //             })
    //             array.splice(index, 2)
    //             len-=2
    //         }else{
    //         array.splice(index, 1)
    //         len-=1}
    //
    //     }

    return { courseInfos: result }
}