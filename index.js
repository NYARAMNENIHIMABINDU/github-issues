const issueList = document.querySelector("#issues");
const pageHeader = document.getElementById("paging");

let pagenumber = 1;

const fetchIssues = async () => {
  const link = `https://api.github.com/repositories/1296269/issues?page=${pagenumber}&per_page=5`;
  const respond = await fetch(link);
  const result = await respond.json();
  return result;
};

const displayIssues = (issues) => {
  issueList.innerHTML = "";
  issues.forEach((issue) => {
    const issueName = issue.title;
    const newissue = document.createElement("li");
    newissue.textContent = issueName;
    issueList.appendChild(newissue);
  });
};

const loadNextPage = async () => {
  pagenumber += 1;
  const issues = await fetchIssues();
  displayIssues(issues);
  pageHeader.textContent = `Page number${pagenumber}`;
};

fetchIssues().then((issues) => {
  displayIssues(issues);
  pageHeader.textContent = `Page number ${pagenumber}`;
});

const Button1 = document.querySelector("#next");
Button1.addEventListener("click", loadNextPage);

const loadprevPage = async () => {
  if (pagenumber > 1) {
    pagenumber -= 1;
    const issues = await fetchIssues();
    displayIssues(issues);
    pageHeader.textContent = `Page number ${pagenumber}`;
  }
};

const Button2 = document.querySelector("#prev");
Button2.addEventListener("click", loadprevPage);
