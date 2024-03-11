import "./SkeltonLoader.css";
export default function CardLoader({ dateTypeChange }) {
    const COUNTER = 1;
    const CourseSkelton = () => (
        <div
            className="card position-relative me-4 mb-4 card-container-skelton"
            style={{ cursor: "pointer" }}
        >
            {dateTypeChange.type === "all" && (
                <div className="skelton-card-body1">
                    <span className="skelton-card-bodyYear"></span>
                    <span className="skelton-card-bodyYear"></span>
                    <span className="skelton-card-bodyYear"></span>
                    <span className="skelton-card-bodyYear"></span>
                    <span className="skelton-card-bodyYear"></span>
                </div>
            )}
            {dateTypeChange.type === "7d" && (
                <div className="skelton-card-body1">
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                </div>
            )}
            {dateTypeChange.type === "1y" && (
                <div className="skelton-card-body1">
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body12"></span>
                </div>
            )}
            {dateTypeChange.type === "1m" && (
                <div className="skelton-card-body1">
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body12"></span>
                </div>
            )}
            {dateTypeChange.type === "calendar" && (
                <div className="skelton-card-body1">
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body11"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body12"></span>
                    <span className="skelton-card-body12"></span>
                </div>
            )}
        </div>
    );
    return Array(COUNTER).fill(<CourseSkelton key={Math.random()} />);
}

export function ListLoader() {
    const COUNTER = 1;
    const CourseSkelton = () => (
        <div
            className="card position-relative my-4 card-container-skelton2"
            style={{ cursor: "pointer" }}
        ></div>
    );
    return Array(COUNTER).fill(<CourseSkelton key={Math.random()} />);
}

export function CountCardLoader() {
    const COUNTER = 1;
    const CourseSkelton = () => (
        <div
            className="card position-relative my-4 card-container-skelton3"
            style={{ cursor: "pointer" }}
        >
            <div className="countCardLoader"></div>
            <div className="countCardLoader"></div>
            <div className="countCardLoader"></div>
            <div className="countCardLoader"></div>
        </div>
    );
    return Array(COUNTER).fill(<CourseSkelton key={Math.random()} />);
}

export function ProfileImageLoader() {
    const COUNTER = 1;
    const CourseSkelton = () => (
        <div
            className="profileImage-skelton"
            style={{ cursor: "pointer" }}
        ></div>
    );
    return Array(COUNTER).fill(<CourseSkelton key={Math.random()} />);
}
export function InputLoader() {
    const COUNTER = 1;
    const CourseSkelton = () => (
        <div className="marketplaceBannerInput-skelton">
            <label></label>
            <input name="name" disabled />
        </div>
    );
    return Array(COUNTER).fill(<CourseSkelton key={Math.random()} />);
}
export function InputWithOutLebelLoader() {
    const COUNTER = 1;
    const CourseSkelton = () => (
        <div className="marketplaceBannerInput-skelton">
            <input name="name" disabled />
        </div>
    );
    return Array(COUNTER).fill(<CourseSkelton key={Math.random()} />);
}
export function OneLineTextLoader() {
    const COUNTER = 1;
    const CourseSkelton = () => <div className="oneLineText-skelton"></div>;
    return Array(COUNTER).fill(<CourseSkelton key={Math.random()} />);
}
export function SingleOrderTopLoader() {
    const COUNTER = 1;
    const CourseSkelton = () => (
        <div className="orderInfoHeader-skelton">
            <h2></h2>
            <p></p>
            <button></button>
        </div>
    );
    return Array(COUNTER).fill(<CourseSkelton key={Math.random()} />);
}

export function TableLoader() {
    const COUNTER = 1;
    const CourseSkelton = () => (
        <div className="table-skelton" style={{ cursor: "pointer" }}>
            <div className="tableHeader-skelton">
                <div className="tableHeaderLeft-skelton">
                    <div className="tableHeaderLeftItem-skelton"></div>
                </div>
                <div className="tableHeaderRight-skelton">
                    <span className="tableHeaderRightItem-skelton"></span>
                    <span className="tableHeaderRightItem-skelton"></span>
                    <span className="tableHeaderRightItem-skelton"></span>
                    <span className="tableHeaderRightItem-skelton"></span>
                    <span className="tableHeaderRightItem-skelton"></span>
                </div>
            </div>
            <div className="tableBodyRight-skelton">
                <table className="fl-table tg">
                    <thead>
                        <tr>
                            <th className="tg-cly1">
                                <div className="line"></div>
                            </th>
                            <th className="tg-cly1">
                                <div className="line"></div>
                            </th>
                            <th className="tg-cly1">
                                <div className="line"></div>
                            </th>
                            <th className="tg-cly1">
                                <div className="line"></div>
                            </th>
                            <th className="tg-cly1">
                                <div className="line"></div>
                            </th>
                            <th className="tg-cly1">
                                <div className="line"></div>
                            </th>
                            <th className="tg-cly1">
                                <div className="line"></div>
                            </th>
                            <th className="tg-cly1">
                                <div className="line"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                            <td className="tg-cly1">
                                <div className="line"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
    return Array(COUNTER).fill(<CourseSkelton key={Math.random()} />);
}
