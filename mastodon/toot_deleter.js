async function toots() {
	// Number of the most recent toot to start deleting from
	start = 1;
	// How many of the most recent we want to delete
	amount = 3;
	// Actual list of all the toots
	list = document.getElementsByClassName("account-timeline__header")[0].parentElement;
	for (i = 0; i < amount; i++) {
		// If the toot happens to be a retoot, we skip it
		if (list.children[start].firstChild.firstChild.firstChild.className != "status__prepend") {
			// The dropwdown opener button is always the last child inside the action bar, so we take count minus 1 to select it
			dropwdownindex=list.children[start].firstChild.firstChild.firstChild.childElementCount-1
			// Index 0 is profile info, we always take the first child as toots automatically dissapear upon deletion
			list.children[start].firstChild.firstChild.firstChild.children[dropwdownindex].children[3].firstChild.firstChild.click();
		
			// We choose to delete the item, which is always the penultimate index, so length minus 2
			deleteindex=document.getElementsByClassName("dropdown-menu__item").length-2
			document.getElementsByClassName("dropdown-menu__item")[deleteindex].firstChild.click();
		
			// Confirm the deletion of the toot and wait half a second to guarantee the next toot moves into the first position
			document.getElementsByClassName("confirmation-modal__action-bar")[0].children[1].click();
			await sleep(500);
		} else {
			// Arriving here means we encountered a re-toot, so we increase the start in order to avoid eternal looping it
			start++;
			amount++;
		}
	}
}
// https://runkit.com/dandv/57f770a7aed68d0014e7b660
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

toots();
