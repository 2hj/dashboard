import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Customer extends React.Component {
    render() {
        return(
            // <div>
                <TableRow>
                    <TableCell>{this.props.id}</TableCell>
                    <TableCell><img src={this.props.img} alt="profile" /></TableCell>
                    <TableCell>{this.props.name}</TableCell>
                    <TableCell>{this.props.birth}</TableCell>
                    <TableCell>{this.props.gender}</TableCell>
                    <TableCell>{this.props.job}</TableCell>
                </TableRow>
            // </div>
            // material-ui 를 사용할 때 Table 안의 Table이 div로 감싸져있으면 반응형 적용 안 되는 듯 (상위컴포넌트 <App/> 에서 전체 div로 테이블들을 감싸고 있으므로)
        );
    }
}




export default Customer;