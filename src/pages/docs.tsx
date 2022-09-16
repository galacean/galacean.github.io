import { WindowLocation } from "@reach/router";
import type { GetServerDataProps, GetServerDataReturn, PageProps } from "gatsby";
import { gql, GraphQLClient } from "graphql-request";
import matter from "gray-matter";
import React from "react";
import Media from "react-media";
import Doc from "../components/Doc/Doc";
import { Layout } from "../components/layout/index";

const { token } = require("../../siteconfig.json");
export interface ServerDataProps {
  fileName: string;
  lang: string;
  frontmatter: {
    order: number;
    /**
     * 条目
     */
    title: string;
    /**
     * 一级菜单
     */
    type: string;
    /**
     * 分组
     */
    group?: string;
  };
}

const DocPage: React.FC = (props: PageProps<object, object, WindowLocation["state"], ServerDataProps[]>) => {
  return (
    <Media query="(max-width: 996px)">
      {(isMobile) => {
        const isNode = typeof window === "undefined";
        return (
          !isNode && (
            <Layout
              {...props}
              isMobile={isMobile}
              children={<Doc isMobile={isMobile} serverData={props.serverData} />}
            />
          )
        );
      }}
    </Media>
  );
};

export async function getServerData(props: GetServerDataProps): GetServerDataReturn<ServerDataProps> {
  const branch = props.query.version || "main";
  const queryFiles = gql`
    query RepoFiles($owner: String!, $name: String!, $branch: String!) {
      repository(owner: $owner, name: $name) {
        object(expression: $branch) {
          ... on Tree {
            entries {
              name
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  `;

  const client = new GraphQLClient("https://api.github.com/graphql", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const fileNamesRes = await client.request(queryFiles, {
    owner: "oasis-engine",
    name: "oasis-engine.github.io",
    branch: `${branch}:docs`
  });

  const fileContent: ServerDataProps = fileNamesRes.repository.object.entries.map((data) => {
    let res: any = {};
    res.fileName = data.name;
    res.frontmatter = matter(data.object.text).data;
    res.lang = (data.name as string).includes("zh-CN") ? "cn" : "en";
    return res;
  });

  return {
    status: 200, // The HTTP status code that should be returned
    props: fileContent, // Will be passed to the page component as "serverData" prop
    headers: {} // HTTP response headers for this page
  };
}
export default DocPage;
