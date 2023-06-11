#!/usr/bin/env node

import rootCmd from "./project/planeta/cmd/root";
import "./project/planeta/cmd/userportal";

rootCmd.parse(process.argv);
