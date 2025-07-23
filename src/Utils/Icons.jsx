import { BsThreeDotsVertical } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { LiaBookSolid } from "react-icons/lia";

const menu_dot_icon = <BsThreeDotsVertical size={23} />
const no_of_students = <GoPeople size={23} />
const no_of_subjects = <LiaBookSolid size={23} />

const delete_icons = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
    <path d="M14 3.98763C11.78 3.76763 9.54667 3.6543 7.32 3.6543C6 3.6543 4.68 3.72096 3.36 3.8543L2 3.98763" stroke="#E73C3C" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M5.66602 3.31398L5.81268 2.44065C5.91935 1.80732 5.99935 1.33398 7.12602 1.33398H8.87268C9.99935 1.33398 10.086 1.83398 10.186 2.44732L10.3327 3.31398" stroke="#E73C3C" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12.5669 6.09375L12.1336 12.8071C12.0603 13.8537 12.0003 14.6671 10.1403 14.6671H5.86026C4.00026 14.6671 3.94026 13.8537 3.86693 12.8071L3.43359 6.09375" stroke="#E73C3C" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.88672 11H9.10672" stroke="#E73C3C" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.33398 8.33398H9.66732" stroke="#E73C3C" stroke-linecap="round" stroke-linejoin="round" />
</svg>

const no_of_books = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.875 4.375H16.25C16.25 4.04348 16.1183 3.72554 15.8839 3.49112C15.6495 3.2567 15.3315 3.125 15 3.125C14.064 3.12681 13.1381 3.31889 12.2785 3.68956C11.419 4.06023 10.6438 4.60176 10 5.28125C9.35621 4.60176 8.581 4.06023 7.72148 3.68956C6.86195 3.31889 5.93604 3.12681 5 3.125C4.66848 3.125 4.35054 3.2567 4.11612 3.49112C3.8817 3.72554 3.75 4.04348 3.75 4.375H3.125C2.62772 4.375 2.15081 4.57254 1.79917 4.92417C1.44754 5.27581 1.25 5.75272 1.25 6.25V15C1.25 15.4973 1.44754 15.9742 1.79917 16.3258C2.15081 16.6775 2.62772 16.875 3.125 16.875H16.875C17.3723 16.875 17.8492 16.6775 18.2008 16.3258C18.5525 15.9742 18.75 15.4973 18.75 15V6.25C18.75 5.75272 18.5525 5.27581 18.2008 4.92417C17.8492 4.57254 17.3723 4.375 16.875 4.375ZM15 4.375V13.125C13.4022 13.1277 11.8553 13.6868 10.625 14.7063V6.475C11.153 5.82261 11.8195 5.29576 12.5761 4.93256C13.3328 4.56937 14.1607 4.37892 15 4.375ZM5 4.375C5.83929 4.37892 6.66722 4.56937 7.42387 4.93256C8.18052 5.29576 8.84697 5.82261 9.375 6.475V14.7063C8.14472 13.6868 6.59777 13.1277 5 13.125V4.375ZM2.5 15V6.25C2.5 6.08424 2.56585 5.92527 2.68306 5.80806C2.80027 5.69085 2.95924 5.625 3.125 5.625H3.75V13.125C3.75 13.4565 3.8817 13.7745 4.11612 14.0089C4.35054 14.2433 4.66848 14.375 5 14.375C6.28318 14.3774 7.52697 14.8185 8.525 15.625H3.125C2.95924 15.625 2.80027 15.5592 2.68306 15.4419C2.56585 15.3247 2.5 15.1658 2.5 15ZM17.5 15C17.5 15.1658 17.4342 15.3247 17.3169 15.4419C17.1997 15.5592 17.0408 15.625 16.875 15.625H11.475C12.473 14.8185 13.7168 14.3774 15 14.375C15.3315 14.375 15.6495 14.2433 15.8839 14.0089C16.1183 13.7745 16.25 13.4565 16.25 13.125V5.625H16.875C17.0408 5.625 17.1997 5.69085 17.3169 5.80806C17.4342 5.92527 17.5 6.08424 17.5 6.25V15Z" fill="#6C6C6C" />
</svg>

const no_of_tests = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17.5 5.83268V14.166C17.5 16.666 16.25 18.3327 13.3333 18.3327H6.66667C3.75 18.3327 2.5 16.666 2.5 14.166V5.83268C2.5 3.33268 3.75 1.66602 6.66667 1.66602H13.3333C16.25 1.66602 17.5 3.33268 17.5 5.83268Z" stroke="#6C6C6C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12.9173 1.66602V8.216C12.9173 8.58267 12.484 8.766 12.2173 8.52433L10.284 6.74104C10.1257 6.59104 9.87563 6.59104 9.7173 6.74104L7.78401 8.52433C7.51734 8.766 7.08398 8.58267 7.08398 8.216V1.66602H12.9173Z" stroke="#6C6C6C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11.041 11.666H14.5827" stroke="#6C6C6C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.5 15H14.5833" stroke="#6C6C6C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
</svg>


const pdfDeleteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M14 3.98568C11.78 3.76568 9.54667 3.65234 7.32 3.65234C6 3.65234 4.68 3.71901 3.36 3.85234L2 3.98568"
      stroke="#E73C3C"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.66602 3.31203L5.81268 2.4387C5.91935 1.80536 5.99935 1.33203 7.12602 1.33203H8.87268C9.99935 1.33203 10.086 1.83203 10.186 2.44536L10.3327 3.31203"
      stroke="#E73C3C"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5669 6.09375L12.1336 12.8071C12.0603 13.8537 12.0003 14.6671 10.1403 14.6671H5.86026C4.00026 14.6671 3.94026 13.8537 3.86693 12.8071L3.43359 6.09375"
      stroke="#E73C3C"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.88672 11H9.10672"
      stroke="#E73C3C"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.33398 8.33203H9.66732"
      stroke="#E73C3C"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const testScreenEditIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M18.7923 10.357V6.45204C18.7923 2.75787 17.9306 1.83203 14.4656 1.83203H7.53565C4.07065 1.83203 3.20898 2.75787 3.20898 6.45204V16.7737C3.20898 19.212 4.54733 19.7895 6.16983 18.0479L6.17898 18.0387C6.93064 17.2412 8.07647 17.3054 8.72731 18.1762L9.65315 19.4137"
      stroke="#0A1629"
      stroke-width="1.3175"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.33398 6.41602H14.6673"
      stroke="#0A1629"
      stroke-width="1.3175"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.25 10.084H13.75"
      stroke="#0A1629"
      stroke-width="1.3175"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.6928 13.5409L13.4478 16.7859C13.3195 16.9142 13.2003 17.1526 13.1728 17.3267L12.9986 18.5642C12.9344 19.0134 13.2461 19.3251 13.6953 19.2609L14.9328 19.0867C15.107 19.0592 15.3544 18.9401 15.4736 18.8117L18.7186 15.5667C19.2778 15.0076 19.5436 14.3567 18.7186 13.5317C17.9028 12.7159 17.2519 12.9817 16.6928 13.5409Z"
      stroke="#0A1629"
      stroke-width="1.3175"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.2227 14.0078C16.4977 14.9978 17.2677 15.7678 18.2577 16.0428"
      stroke="#0A1629"
      stroke-width="1.3175"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);


const Icons = {
    menu_dot_icon, no_of_students, no_of_subjects, delete_icons,
    no_of_books, no_of_tests,pdfDeleteIcon, testScreenEditIcon 
}

export default Icons;
