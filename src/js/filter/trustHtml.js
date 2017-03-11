let trustFilter = ($sce) => {
	return (text) => {
		return $sce.trustAsHtml(text);
	}
}
export default trustFilter;