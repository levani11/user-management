import './loading.scss';

export default function Loading() {
  return (
    <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center overlay ">
      <div className="lds-dual-ring"></div>
    </div>
  );
}
