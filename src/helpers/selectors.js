export const getAppointmentsForDay = function (state, day) {

    if (!state['days'] || state['days'].length === 0) return [];

    let filteredDay = state['days'].filter(item => item.name === day);

    if (!filteredDay || filteredDay.length === 0) return [];

    let apps = filteredDay[0].appointments;

    if (apps.length === 0) return [];

    const res = apps.map(item => state['appointments'][item]);
    return res;
}

export const getInterview = function (state, interview) {

    let ans = {};
    if (!interview || interview.length === 0) return null;
    if (!state['appointments']) return null;
    let filtered = state['interviewers'][(interview.interviewer)]

    ans['id'] = interview.id;
    ans['student'] = interview.student;
    ans['interviewer'] = filtered;

    return ans;
}

export const getInterviewersForDay = function (state, day) {
    
    if (!state['days'] || state['days'].length === 0) return [];

    let filteredDay = state['days'].filter(item => item.name === day);

    if (!filteredDay || filteredDay.length === 0) return [];

    let interviewers = filteredDay[0].interviewers;

    if (!interviewers || interviewers.length === 0) return [];

    const res = interviewers.map(item => state['interviewers'][item]);
    console.log(res);
    return res;
}