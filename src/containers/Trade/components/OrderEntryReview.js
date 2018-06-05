import React from 'react';
import classnames from 'classnames';
import math from 'mathjs';

import STRINGS from '../../../config/localizedStrings';

const ROW_CLASSNAMES = ['d-flex', 'justify-content-between'];

const renderAmount = (value, currency) =>
	`${value}${currency && ` ${currency}`}`;

const Review = ({
	orderPrice = 0,
	fees = 0,
	currency,
	formatToCurrency,
	type
}) => {
	const orderAmountReceived = math.subtract(
		math.fraction(orderPrice),
		math.fraction(fees)
	);
	const upToMarket = !math.smaller(orderPrice, 0);
	return (
		<div className="trade_order_entry-review d-flex flex-column">
			<div className={classnames(...ROW_CLASSNAMES)}>
				<div>
					{type === 'market' ? STRINGS.MARKET_PRICE : STRINGS.ORDER_PRICE}:
				</div>
				<div className="text-price">
					{upToMarket
						? renderAmount(formatToCurrency(orderAmountReceived), currency)
						: STRINGS.UP_TO_MARKET}
				</div>
			</div>
			<div className={classnames(...ROW_CLASSNAMES)}>
				<div>{STRINGS.FEES}:</div>
				<div className="text-price">
					{upToMarket
						? renderAmount(formatToCurrency(fees), currency)
						: STRINGS.UP_TO_MARKET}
				</div>
			</div>
			<div className={classnames(...ROW_CLASSNAMES)}>
				<div>{STRINGS.TOTAL_ORDER}:</div>
				<div className="text-price">
					{upToMarket
						? renderAmount(formatToCurrency(orderPrice), currency)
						: STRINGS.UP_TO_MARKET}
				</div>
			</div>
		</div>
	);
};

Review.defaultProps = {
	orderPrice: 0,
	fees: 0,
	orderTotal: 0,
	currency: '',
	formatToCurrency: (value) => value
};

export default Review;