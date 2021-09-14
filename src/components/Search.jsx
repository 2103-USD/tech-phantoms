const google = "https://www.google.com/search?q=site%3A+";
const site = "https://fast-savannah-33549.herokuapp.com/";

export function Search(query) {
    const url = google + site + "+" + query;
    const win = window.open(url, "_blank");
    win.focus();
}
