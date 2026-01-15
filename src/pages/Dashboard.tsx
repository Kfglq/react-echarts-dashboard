// src/pages/Dashboard.tsx
import { useEffect, type JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from 'antd';
import _ from "lodash";

// import type { RootState } from "@/store";
import { selectPersonNames } from '@/selectors/DashboardSelector';
// import type { DashboardPayload } from "@/types/Dashboard";
import ChartCard from '@/components/ChartCard';
import "./Dashboard.scss";

const Dashboard: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const personNames = useSelector(selectPersonNames);

  useEffect((): void =>{
    // const payload: DashboardPayload = { startDate: "2026-01-01", endDate: "2026-01-31" };
    dispatch({type:"Dashboard_Data"});
  },[dispatch]);

  return(
    <div id="Dashboard">
      <Row gutter={[16, 16]}>
        {personNames.map((name: string): JSX.Element => (
          <Col key={name} xs={24} sm={12} md={8} lg={6}>
            <Card title={name}>
              <ChartCard personName={name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Dashboard;
