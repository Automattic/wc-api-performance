import http from 'k6/http';
import { base_url, cs_key, cs_secret } from './config.js';
import { group, check } from 'k6';
import { custom_tag } from './config.js';

export class ResourceBenchmark {
	
	startTest() {
		group( custom_tag, () => {
			this.run();
		} );
	}

	listResource( resource_url, per_page, start_page, page_count, fields = [] ) {
		let page_counter = 0;
		while( page_counter < page_count ){
			let current_page = start_page + page_counter;
			page_counter++;
			let url = `${base_url}/wp-json/wc/${resource_url}?consumer_key=${cs_key}&consumer_secret=${cs_secret}&per_page=${per_page}&page=${current_page}`;
			
			if ( fields.length > 0 ) {
				const fields_params = fields.join( ',' );
				url = url + `&_fields=${fields_params}`;
			}
			
			const response = http.get( url );
			check( response, { 
				'status is 200': (r) => { 
					if ( 200 !== r.status ) {
						console.log( 'Error: Expected status to be 200, received : ' + r.status );
					}
					return r.status === 200;
				},
			} );
		}
	}
}
