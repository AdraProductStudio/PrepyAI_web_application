
import InputOnly from 'Components/Input/inputOnly';
import Icons from 'Utils/Icons';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import { update_error, update_search } from 'Views/Common/Slices/Common_slice';

export function SearchComponent({ className, placeholder, onClick, filter_options }) {
    const dispatch = useDispatch();
    const { commonState } = useCommonState();

    function searchFun() {
        if (commonState?.search?.value) {
            if (typeof onClick === 'function') {
                dispatch(update_search({ value: commonState?.search?.value, clicked: true }))
                if (typeof filter_options === 'object') {
                    onClick({ filter_options, search_query: commonState?.search?.value })
                }
            }
        }
        else dispatch(update_error({ Toast_Type: "error", Err: "search field should not be empty" }))
    }

    function handleSearchEnter(event) {
        if (event.code === "Enter") {
            searchFun()
        }
    }

    return (
        <div className="position-relative w-100">
            <InputOnly
                type="text"
                className={`search_input ${className}`}
                placeholder={placeholder}
                change={(e) => dispatch(update_search({ value: e.target.value || '', clicked: false }))}
                keyDown={handleSearchEnter}
                value={commonState?.search?.value || ''}
            />

            <span className="input-group-start-icon text-secondary">{Icons.searchIconGray}</span>
            {commonState?.search?.value ?
                <span className={`${commonState?.search?.clicked ? 'cursor-pointer' : 'pe-none'} input-group-end-icon-three`} onClick={() => {
                    dispatch(update_search({ value: '', clicked: false }))
                    onClick({ filter_options, search_query: '' })
                }}>{Icons.search_cancel_icon}</span>
                :
                <span className="input-group-end-icon-two cursor-pointer" onClick={searchFun}>{Icons.searchIcon}</span>
            }
        </div>
    );

}