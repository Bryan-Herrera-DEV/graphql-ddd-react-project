import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export const REGISTER = gql`
  mutation Register($password: String!, $email: String!) {
    register(password: $password, email: $email)
  }
`;
