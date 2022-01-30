import React from 'react';
import s from './Paginator.module.css';

type propsType = {
    currentPage: number,
    totalPagesCount: number,
    changePage: (page: number) => void
}


const getPages = (currentPage: number, totalCount: number, changePage: (page: number) => void):Array<JSX.Element> => {
    const result: JSX.Element[] = [];
    const pushPage = (i: number) => {
        result.push(
            <div
                className={`${s.page} ${i === currentPage ? s.currentPage : ''}`}
                onClick={() => changePage(i)}
                key={i}
            >{i}</div>
        );
    }

    if (totalCount <= 10) {
        for (let i = 1; i <= totalCount; i++) {
            pushPage(i);
        }
    } else if (currentPage >= 6) {
        if (totalCount - currentPage < 5) {
            for (let i = totalCount - 9; i <= totalCount; i++) {
                pushPage(i);
            }
        } else {
            for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                pushPage(i);
            }
        }
    } else {
        for (let i = 1; i <= 10; i++) {
            pushPage(i);
        }
    }
    return result;
}

const Paginator = ({currentPage, totalPagesCount, changePage}: propsType) => {
    return (
        <div className={s.paginator}>
            <div
                className={s.page}
                onClick={() => changePage(1)}
            >&laquo;</div>
            <div
                className={s.page}
                onClick={() => changePage(currentPage === 1 ? 1 : currentPage - 1)}
            >&lt;</div>
            {getPages(currentPage, totalPagesCount, changePage)}
            <div
                className={s.page}
                onClick={() => changePage(currentPage === totalPagesCount ? totalPagesCount : currentPage + 1)}
            >&gt;</div>
            <div
                className={s.page}
                onClick={() => changePage(totalPagesCount)}
            >&raquo;</div>
        </div>
    );
};

export default Paginator;