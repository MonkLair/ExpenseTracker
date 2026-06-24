import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { changeCurrency } from "../../store/reducers/dataSlice"

interface ModalProps {
    setIsOpen: (value: React.SetStateAction<boolean>) => void
}

interface Rates {
    [key: string]: number
}

interface CurrenciesRequest {
    success: boolean,
    timestamp: number,
    base: string,
    date: Date,
    rates: Rates
}


export default function ChangeCurrencyModal({ setIsOpen }: ModalProps) {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [data, setData] = useState<string[]>([])
    const { currency, user } = useAppSelector(state => state.dataReducer)

    function handleCurrencyClick(e: React.MouseEvent<HTMLSpanElement>) {
        dispatch(changeCurrency({ newCurrency: e.currentTarget.textContent, userId: user }))
    }

    useEffect(() => {
        async function request() {
            const response = await fetch('http://data.fixer.io/api/latest?access_key=4b9fb458313e99499f61193999c373ac')
            const data: CurrenciesRequest = await response.json()
            setData(Object.keys(data.rates))
        }
        request()
    }, [])

    const result = data.filter(item => {
        return item.includes(searchValue.toUpperCase())
    })

    useEffect(() => {
        if (data.length == 0) return;
        document.querySelector('.currency-list .active')?.classList.remove('active');
        document.querySelector(`.${currency}`)?.classList.add('active');
    }, [currency, data.length, result])

    return (
        <div onClick={() => setIsOpen(false)} className="currency-modal-container">
            <div onClick={(e) => e.stopPropagation()} className="currency-modal">
                <div className="modal-name">
                    <span>Currencies:</span>
                    <FontAwesomeIcon size='lg' onClick={() => setIsOpen(false)} className="close-icon" icon={faXmark} />
                </div>
                <div className="currencies">
                    <div className="currencies-search-container">
                        <input type="text" className="currencies-search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        <FontAwesomeIcon className="search-icon" icon={faSearch} />
                    </div>
                    <hr />
                    <div className="currency-list">
                        {data ?
                            result.map((value: string, index: number) => {
                                return <div
                                    key={index}
                                    className={`currency-item ${value}`}
                                    onClick={handleCurrencyClick}
                                >
                                    {value}
                                </div>
                            })
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}