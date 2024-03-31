"use client";
import { Chart } from "react-google-charts";
import { title } from 'process';
import { graphqlClient } from '@/graphql/client';
import { BitconNodeipDocument } from '@/graphql/__generated__/graphql';
type NodeStatistic = { IPv4: number } | { IPv6: number } | { TOR: number };

interface NodeipResponse {
    bitconNodeip: {
        nodesStatistic: {
            data: {
                network: Array<{
                    tor: number | null;
                    ipv6: number | null;
                    ipv4: number | null;
                }>;
            };
        };
    };
}
async function getnodeip(): Promise<NodeipResponse | null> {
    try {
        const response = await graphqlClient.request(BitconNodeipDocument, {});
        return response as NodeipResponse;
    } catch (error) {
        console.error("Error fetching nodeip:", error);
        return null;
    }
}
const Nodeip = async () => {
    const nodeip = await getnodeip();
    if (!nodeip) {
        return <p>Error loading nodeip data.</p>;
    }
    const nodeStatistics = nodeip.bitconNodeip.nodesStatistic.data.network;
    const data = nodeStatistics.map((node) => {
        return [
            node.ipv4,
            node.ipv6,
            node.tor
        ];
    });
    let ipv4 = data[0].filter((value) => value !== null);
    let ipv6 = data[1].filter((value) => value !== null);
    let tor = data[2].filter((value) => value !== null);
    let total = ipv4.reduce((acc, curr) => acc + curr, 0) + ipv6.reduce((acc, curr) => acc + curr, 0) + tor.reduce((acc, curr) => acc + curr, 0);
    const coldata = [
        ["Element", "Density", { role: "style" }],
        ["IPV4", ipv4, "#b87333"], // RGB value
        ["IPV6", ipv6, "silver"], // English color name
        ["TOR", tor, "gold"],
        
      ];
    return (
        <div  style={{backgroundColor:"white"}}>
          
            <table>
              <thead>
                <tr>
                  <th>Nodes discovered</th>
                  <th>{total}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>IPV4</td>
                  <td>{ipv4}</td>
                </tr>
                <tr>
                  <td>IPV6</td>
                  <td>{ipv6}</td>
                </tr>
                <tr>
                  <td>TOR</td>
                  <td>{tor}</td>
                </tr>
                <tr>
                
                </tr>
              </tbody>
              <tfoot><Chart chartType="ColumnChart" width="100%" height="140px" data={coldata} /></tfoot>
            </table>
            
          
          
        </div>
          
      );

};
  
export default Nodeip;