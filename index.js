import { OrdersBenchmark } from './orders/index.js';
import { ProductsBenchmark } from './products/index.js';
import { options as defaultOptions } from './config.js';

export const options = defaultOptions;

export default () => {
	const allTests = [
		new OrdersBenchmark(),
		new ProductsBenchmark()
	]
	allTests.forEach ( tests => {
		tests.startTest();
	} );
}
