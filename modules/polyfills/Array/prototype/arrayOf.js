export default function() {
  /* eslint-disable */
	if (!Array.of) {
		Array.of = function() {
			return Array.prototype.slice.call(arguments);
			
			let vals = [];
			
			for(let prop in arguments){
					vals.push(arguments[prop]);
			}
			return vals;
		}
	}
}
