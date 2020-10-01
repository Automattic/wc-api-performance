import { options as defaultOptions } from '../config.js';
import { group } from 'k6';
import { ResourceBenchmark } from '../resource.js';

export default () => {
	const productsBenchmark =  new ProductsBenchmark();
	productsBenchmark.run();
}

export const options = defaultOptions;

export class ProductsBenchmark extends ResourceBenchmark {
	run() {
		group( 'Products', () => {
			group( 
				'all fields per_page = 10 for 9 pages',
				() => { this.listProducts( 10, 1, 9 ) },
			);
			group(
				'only id and status field, per_page = 10 for 9 pages',
				() => { this.listProducts( 10, 1, 9, [ 'id', 'status' ] ) }
			);
		} );
	}

	listProducts( per_page, start_page, page_count, fields = [] ) {
		this.listResource( 'v3/products', per_page, start_page, page_count, fields );
	}
}
