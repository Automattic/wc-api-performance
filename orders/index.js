import { options as defaultOptions } from '../config.js';
import { group } from 'k6';
import { ResourceBenchmark } from '../resource.js';

export default () => {
	const ordersBenchmark =  new OrdersBenchmark();
	ordersBenchmark.run();
}

export const options = defaultOptions;

export class OrdersBenchmark extends ResourceBenchmark {

	run() {
		group( 'Orders', () => {
			group( 
				'all fields per_page = 100 for 10 pages',
				() => { this.listOrders( 100, 1, 10 ) },
			);
			group(
				'only id and status field, per_page = 100 for 10 pages',
				() => { this.listOrders( 100, 1, 10, [ 'id', 'status' ] ) }
			);
		} );
	}

	listOrders( per_page, start_page, page_count, fields = [] ) {
		this.listResource( 'v3/orders', per_page, start_page, page_count, fields );
	}
}