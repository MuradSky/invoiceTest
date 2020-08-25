import React from 'react';
import TableCell from './TableCell';
import './Buyers.css'

const BuyersHead = () => {
    return(
        <div className="table__row">
            <TableCell className='table__heading' text = 'ID покупаетля'/>
            <TableCell className='table__heading' text = 'Имя покупателя'/>
            <TableCell className='table__heading' text = 'Средний чек'/>
            <TableCell className='table__heading' text = 'Количество покупок'/>
            <TableCell className='table__heading' text = 'Общая выручка'/>
        </div>
    );
}
export default BuyersHead;