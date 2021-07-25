document.querySelector('.button-container').addEventListener('click',()=>{
    let text=document.getElementById('filter-jobs').value;
    console.log('text',text)
    getJobs().then(jobs=>{
        let filteredJobs=filterJobs(jobs,text.toLowerCase())
        showJobs(filteredJobs)
    })
})

function getJobs(){
   return  fetch('data.json?v=1.1').then(response=>response.json()).then(data=>{
        return data;
    })
}

function filterJobs(jobs,searchText){
    if(searchText){
        let filterJobs=jobs.filter(job=>{
            if(job.roleName.toLowerCase().includes(searchText) 
            || job.type.toLowerCase().includes(searchText) 
            || job.company.toLowerCase().includes(searchText)
            || job.requirements.content.toLowerCase().includes(searchText)

            ){
                return true
            }else{
                return false
            }
        })

        return filterJobs
    }else{
        return jobs
    }

}

function showJobs(jobs){
  let jobsContainer=document.querySelector('.jobs-container');
  let jobsHTML="";
  jobs.forEach(job => {
      console.log('job',job)
      /*html*/
      jobsHTML+=`
      <div class="job-tile">
              <div class="top">
                  <img src="${job.logo}" />
                  <i class="material-icons more_horiz" >more_horiz</i>
              </div>
              <div class="rolename">
                 <span>${job.roleName}</span>
              </div>
              <div class="description">
                <span>
                   ${job.requirements.content}
                </span>
              </div>
              <div class="buttons">
                 <div class="button apply-now">Apply Now</div>
                 <div class="button">
                     message
                 </div>
              </div>

           </div>
      `
  });

  jobsContainer.innerHTML=jobsHTML;

}

getJobs().then(data=>{
    showJobs(data)
})