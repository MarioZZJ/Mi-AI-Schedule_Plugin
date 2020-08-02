function scheduleHtmlParser(html) {
    let result = []
    let courseNteacher = []
    const $ = cheerio.load(html,{decodeEntities: false});
    $('#_ctl1_dgStudentLesson tbody').find('tr').each(function(){
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

    $('#_ctl1_NewKcb table tbody').find('tr').each(function(row){
        $(this).find('td').each(function(column){
            let courseinfo = {}
            if($(this).attr('bgcolor') == "#66FFCC") {
                let cell = $(this).find('div').html().split('<br>');
                let cname = cell[0]
                courseinfo.name = cname
                courseinfo.position = cell[1]
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
    console.info(result)
    return { courseInfos: result }
}